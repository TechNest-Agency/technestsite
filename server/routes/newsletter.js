const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

// MongoDB Schema
const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// Mailchimp Config
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

// Mailchimp Subscribe Function
async function subscribeToMailchimp(email) {
    const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

    const data = {
        email_address: email,
        status: 'subscribed'
    };

    const headers = {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post(url, data, { headers });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response && error.response.data.title === "Member Exists") {
            return { success: false, message: "Email already subscribed to Mailchimp" };
        }
        console.error("Mailchimp Error:", error.response?.data || error.message);
        return { success: false, message: "Failed to subscribe via Mailchimp" };
    }
}

// POST /subscribe
router.post('/subscribe', [
    body('email').isEmail().normalizeEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email } = req.body;

    try {
        const exists = await Subscriber.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already subscribed" });

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        // Also subscribe to Mailchimp
        const mailchimpRes = await subscribeToMailchimp(email);
        if (!mailchimpRes.success) {
            return res.status(500).json({ message: mailchimpRes.message });
        }

        res.status(201).json({ message: "Successfully subscribed to newsletter" });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// POST /unsubscribe
router.post('/unsubscribe', [
    body('email').isEmail().normalizeEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email } = req.body;

    try {
        const result = await Subscriber.deleteOne({ email });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Email not found in local list" });
        }

        // Optionally: unsubscribe from Mailchimp too
        const emailHash = require('crypto')
            .createHash('md5')
            .update(email.toLowerCase())
            .digest('hex');

        const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${emailHash}`;
        await axios.delete(url, {
            headers: {
                Authorization: `apikey ${MAILCHIMP_API_KEY}`
            }
        });

        res.json({ message: "Successfully unsubscribed from newsletter" });
    } catch (error) {
        console.error("Unsubscribe error:", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to unsubscribe" });
    }
});

// GET /subscribers
router.get('/subscribers', async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
        res.json(subscribers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch subscribers' });
    }
});

module.exports = router;
