const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// Get user's orders
router.get('/user', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders' });
    }
});

// Get order details
router.get('/:orderId', auth, async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.orderId,
            user: req.user._id
        });
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching order details' });
    }
});

module.exports = router;
