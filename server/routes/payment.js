const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const SSLCommerzPayment = require('sslcommerz-lts');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// SSLCommerz store config
const store_id = process.env.SSLCOMMERZ_STORE_ID;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
const is_live = false; // true for live, false for sandbox

// Initialize SSLCommerz
const sslcommerz = new SSLCommerzPayment(store_id, store_passwd, is_live);

// Initialize payment with SSLCommerz
router.post('/sslcommerz/init', async (req, res) => {
  try {
    const { cart, total, email } = req.body;
    
    // Create a new order
    const order = new Order({
      orderId: 'REF' + new Date().getTime(),
      customer: {
        email: email
      },
      items: cart,
      payment: {
        method: 'sslcommerz',
        amount: total,
        currency: 'BDT',
        status: 'pending'
      }
    });
    await order.save();
    
    const data = {
      total_amount: total,
      currency: 'BDT',
      tran_id: order.orderId,
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      fail_url: `${process.env.FRONTEND_URL}/payment/fail`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      ipn_url: `${process.env.BACKEND_URL}/api/payment/sslcommerz/ipn`,
      shipping_method: 'No',
      product_name: cart.map(item => item.title).join(', '),
      product_category: 'Services',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: email,
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: '1000',
      ship_country: 'Bangladesh',
    };

    const sslcz = await sslcommerz.init(data);
    res.json({ url: sslcz.GatewayPageURL });
  } catch (error) {
    console.error('SSLCommerz payment error:', error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

// SSLCommerz IPN (Instant Payment Notification)
router.post('/sslcommerz/ipn', async (req, res) => {
  try {
    if (req.body.status === 'VALID') {
      const { val_id, tran_id, amount, card_type, bank_tran_id, card_issuer, card_brand, store_amount } = req.body;
      
      // Update order status
      const order = await Order.findOne({ orderId: tran_id });
      if (order) {
        order.payment.status = 'completed';
        order.payment.validationId = val_id;
        order.payment.cardType = card_type;
        order.payment.cardBrand = card_brand;
        order.payment.cardIssuer = card_issuer;
        order.payment.bankTransactionId = bank_tran_id;
        order.status = 'processing';
        await order.save();
      }

      // Send confirmation email
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Send email to admin
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Payment Received - SSLCommerz',
        html: `
          <h2>New Payment Received</h2>
          <p><strong>Transaction ID:</strong> ${tran_id}</p>
          <p><strong>Validation ID:</strong> ${val_id}</p>
          <p><strong>Amount:</strong> ${amount} BDT</p>
          <p><strong>Payment Method:</strong> ${card_type}</p>
          <p><strong>Card Brand:</strong> ${card_brand || 'N/A'}</p>
          <p><strong>Card Issuer:</strong> ${card_issuer || 'N/A'}</p>
          <p><strong>Bank Transaction ID:</strong> ${bank_tran_id}</p>
          <p><strong>Store Amount:</strong> ${store_amount} BDT</p>
        `,
      });
    } else if (['FAILED', 'CANCELLED'].includes(req.body.status)) {
      const order = await Order.findOne({ orderId: req.body.tran_id });
      if (order) {
        order.payment.status = 'failed';
        order.status = 'cancelled';
        await order.save();
      }
    }
    res.status(200).end();
  } catch (error) {
    console.error('SSLCommerz IPN error:', error);
    res.status(500).end();
  }
});

// Initialize Stripe payment
router.post('/stripe/init', async (req, res) => {
  try {
    const { cart, total, email } = req.body;

    // Create a new order
    const order = new Order({
      orderId: 'REF' + new Date().getTime(),
      customer: {
        email: email
      },
      items: cart,
      payment: {
        method: 'stripe',
        amount: total,
        currency: 'USD',
        status: 'pending'
      }
    });
    await order.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
          },
          unit_amount: Math.round(parseFloat(item.price) * 100), // Convert to cents
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      customer_email: email,
      metadata: {
        orderId: order.orderId
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe payment error:', error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

// Stripe webhook handler
router.post('/stripe/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Stripe webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const order = await Order.findOne({ orderId: session.metadata.orderId });
    
    if (order) {
      order.payment.status = 'completed';
      order.payment.transactionId = session.payment_intent;
      order.status = 'processing';
      await order.save();

      // Send confirmation email
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Payment Received - Stripe',
        html: `
          <h2>New Payment Received</h2>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Amount:</strong> $${order.payment.amount}</p>
          <p><strong>Customer Email:</strong> ${order.customer.email}</p>
          <p><strong>Payment Method:</strong> Stripe</p>
          <p><strong>Transaction ID:</strong> ${session.payment_intent}</p>
        `,
      });
    }
  }

  res.json({ received: true });
});

// Request Payoneer invoice
router.post('/payoneer/request', [
  body('email').isEmail(),
  body('message').optional().trim(),
  body('amount').isNumeric(),
  body('items').isArray(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, message, amount, items } = req.body;

    // Create a new order
    const order = new Order({
      orderId: 'REF' + new Date().getTime(),
      customer: {
        email: email,
        message: message
      },
      items: items,
      payment: {
        method: 'payoneer',
        amount: amount,
        currency: 'USD',
        status: 'pending'
      }
    });
    await order.save();

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email to admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Payoneer Invoice Request',
      html: `
        <h2>New Invoice Request</h2>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>Client Email:</strong> ${email}</p>
        <p><strong>Amount:</strong> $${amount}</p>
        <p><strong>Message:</strong> ${message || 'No message provided'}</p>
        <h3>Items:</h3>
        <ul>
          ${items.map(item => `<li>${item.title} - ${item.price}</li>`).join('')}
        </ul>
      `,
    });

    res.json({ message: 'Invoice request sent successfully' });
  } catch (error) {
    console.error('Payoneer request error:', error);
    res.status(500).json({ error: 'Failed to send invoice request' });
  }
});

module.exports = router;