const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Newsletter subscriber schema
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

// Subscribe to newsletter
router.post('/subscribe', [
    body('email').isEmail().normalizeEmail()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;

        // Check if already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        // Create new subscriber
        const subscriber = new Subscriber({ email });
        await subscriber.save();

        res.status(201).json({ message: 'Successfully subscribed to newsletter' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to subscribe' });
    }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', [
    body('email').isEmail().normalizeEmail()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;

        // Remove subscriber
        const result = await Subscriber.deleteOne({ email });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Email not found in subscribers list' });
        }

        res.json({ message: 'Successfully unsubscribed from newsletter' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to unsubscribe' });
    }
});

// Get all subscribers (Admin only)
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