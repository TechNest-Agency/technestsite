const crypto = require('crypto');
const Order = require('../models/Order');
const nodemailer = require('nodemailer');
const bkashService = require('../services/bkash');
const nagadService = require('../services/nagad');
const payoneerService = require('../services/payoneer');

// Mobile banking utility functions
const generatePaymentId = () => {
    return 'PAY' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
};

const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

const sendPaymentNotification = async (type, orderDetails) => {
    const transporter = createTransporter();
    
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New ${type} Payment Initiated`,
        html: `
            <h2>New Payment Initiated</h2>
            <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
            <p><strong>Payment Method:</strong> ${type}</p>
            <p><strong>Amount:</strong> ${orderDetails.payment.amount} ${orderDetails.payment.currency}</p>
            <p><strong>Customer Email:</strong> ${orderDetails.customer.email}</p>
            ${orderDetails.customer.message ? `<p><strong>Message:</strong> ${orderDetails.customer.message}</p>` : ''}
        `,
    });
};

// Controller methods
exports.initiateBkashPayment = async (req, res) => {
    try {
        const { orderId, amount } = req.body;
        const payment = await bkashService.createPayment(amount, orderId);
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to initiate bKash payment' });
    }
};

exports.bkashCallback = async (req, res) => {
    try {
        const { paymentID } = req.body;
        const payment = await bkashService.executePayment(paymentID);
        
        if (payment.statusCode === '0000') {
            await Order.findOneAndUpdate(
                { orderId: payment.merchantInvoiceNumber },
                { 
                    status: 'paid',
                    paymentDetails: payment 
                }
            );
            res.json({ success: true, payment });
        } else {
            res.status(400).json({ error: 'Payment failed' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to process bKash callback' });
    }
};

exports.initiateNagadPayment = async (req, res) => {
    try {
        const { orderId, amount } = req.body;
        const payment = await nagadService.initializePayment(amount, orderId);
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to initiate Nagad payment' });
    }
};

exports.nagadCallback = async (req, res) => {
    try {
        const { payment_ref_id } = req.query;
        const payment = await nagadService.verifyPayment(payment_ref_id);
        
        if (payment.status === 'Success') {
            await Order.findOneAndUpdate(
                { orderId: payment.order_id },
                { 
                    status: 'paid',
                    paymentDetails: payment 
                }
            );
            res.json({ success: true, payment });
        } else {
            res.status(400).json({ error: 'Payment failed' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to process Nagad callback' });
    }
};

exports.initiatePayoneerPayment = async (req, res) => {
    try {
        const { orderId, amount, payeeId } = req.body;
        const payment = await payoneerService.createPayment(amount, orderId, payeeId);
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to initiate Payoneer payment' });
    }
};

exports.payoneerWebhook = async (req, res) => {
    try {
        const { payout_id, status } = req.body;
        const payment = await payoneerService.getPaymentStatus(payout_id);
        
        if (status === 'PROCESSED') {
            await Order.findOneAndUpdate(
                { 'paymentDetails.payout_id': payout_id },
                { 
                    status: 'paid',
                    paymentDetails: payment 
                }
            );
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process Payoneer webhook' });
    }
};
