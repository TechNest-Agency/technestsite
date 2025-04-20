const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const SSLCommerzPayment = require('sslcommerz-lts');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
    
    const data = {
      total_amount: total,
      currency: 'BDT',
      tran_id: 'REF' + new Date().getTime(),
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
      // Payment successful, update order status
      console.log('Payment successful:', req.body);
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
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe payment error:', error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
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