const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Blog = require('../models/Blog');
const Service = require('../models/Service');
const User = require('../models/User');
const Message = require('../models/Message');
const { auth, adminAuth } = require('../middleware/auth');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const multer = require('multer');
const Settings = require('../models/Settings');
const Order = require('../models/Order');
const Course = require('../models/Course');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max file size
    }
});

// Get dashboard stats
router.get('/dashboard', [auth, adminAuth], async (req, res) => {
    try {
        const stats = {
            totalPosts: await Blog.countDocuments(),
            totalServices: await Service.countDocuments(),
            totalUsers: await User.countDocuments(),
            totalMessages: await Message.countDocuments(),
        };
        res.json({ stats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Blog post management
router.get('/posts', [auth, adminAuth], async (req, res) => {
    try {
        const posts = await Blog.find().sort({ createdAt: -1 });
        res.json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/posts', [
    auth,
    adminAuth,
    body('title').trim().notEmpty(),
    body('content').trim().notEmpty(),
    body('category').trim().notEmpty(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newPost = new Blog({
            ...req.body,
            author: req.user._id
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/posts/:id', [
    auth,
    adminAuth,
    body('title').optional().trim().notEmpty(),
    body('content').optional().trim().notEmpty(),
    body('category').optional().trim().notEmpty(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const post = await Blog.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        Object.assign(post, req.body);
        await post.save();
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/posts/:id', [auth, adminAuth], async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await post.remove();
        res.json({ message: 'Post deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Service management
router.get('/services', [auth, adminAuth], async (req, res) => {
    try {
        const services = await Service.find().sort({ order: 1 });
        res.json({ services });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/services', [
    auth,
    adminAuth,
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('category').trim().notEmpty(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newService = new Service(req.body);
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/services/:id', [
    auth,
    adminAuth,
    body('title').optional().trim().notEmpty(),
    body('description').optional().trim().notEmpty(),
    body('category').optional().trim().notEmpty(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        Object.assign(service, req.body);
        await service.save();
        res.json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/services/:id', [auth, adminAuth], async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        await service.remove();
        res.json({ message: 'Service deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all users
router.get('/users', [auth, adminAuth], async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new user
router.post('/users', [
    auth,
    adminAuth,
    body('username').trim().notEmpty(),
    body('email').isEmail(),
    body('role').isIn(['admin', 'user']),
    body('isEmailVerified').isBoolean()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, role, isEmailVerified } = req.body;
        const password = Math.random().toString(36).slice(-8); // Generate random password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role,
            isEmailVerified
        });

        await user.save();

        // Send email with password
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: email,
            subject: 'Your TechNest Solutions Account',
            html: `
                <h2>Welcome to TechNest Solutions!</h2>
                <p>Your account has been created with the following credentials:</p>
                <p>Username: ${username}</p>
                <p>Password: ${password}</p>
                <p>Please change your password after logging in.</p>
            `
        });

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user
router.put('/users/:id', [
    auth,
    adminAuth,
    body('username').optional().trim().notEmpty(),
    body('email').optional().isEmail(),
    body('role').optional().isIn(['admin', 'user']),
    body('isEmailVerified').optional().isBoolean()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        Object.assign(user, req.body);
        await user.save();

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete user
router.delete('/users/:id', [auth, adminAuth], async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all messages
router.get('/messages', [auth, adminAuth], async (req, res) => {
    try {
        const messages = await Message.find()
            .sort({ createdAt: -1 });

        res.json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update message status
router.patch('/messages/:id', [
    auth,
    adminAuth,
    body('status').isIn(['new', 'read', 'replied'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        message.status = req.body.status;
        await message.save();

        res.json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete message
router.delete('/messages/:id', [auth, adminAuth], async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        await message.remove();
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get settings
router.get('/settings', [auth, adminAuth], async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings();
            await settings.save();
        }
        res.json(settings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update settings
router.put('/settings', [auth, adminAuth], async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings();
        }
        
        Object.assign(settings, req.body);
        await settings.save();
        res.json(settings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Image upload endpoint
router.post('/upload', adminAuth, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Return the URL of the uploaded image
        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({ imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Error uploading image' });
    }
});

// Get admin dashboard statistics
router.get('/stats', adminAuth, async (req, res) => {
    try {
        const [totalOrders, totalRevenue, totalUsers, totalCourses] = await Promise.all([
            Order.countDocuments(),
            Order.aggregate([
                { $match: { status: 'paid' } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ]),
            User.countDocuments(),
            Course.countDocuments()
        ]);

        res.json({
            totalOrders,
            totalRevenue: totalRevenue[0]?.total || 0,
            totalUsers,
            totalCourses
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching statistics' });
    }
});

// Get revenue chart data
router.get('/revenue-chart', adminAuth, async (req, res) => {
    try {
        const monthlyRevenue = await Order.aggregate([
            { $match: { status: 'paid' } },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    total: { $sum: '$amount' }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        const labels = monthlyRevenue.map(item => {
            const date = new Date(item._id.year, item._id.month - 1);
            return date.toLocaleString('default', { month: 'short', year: 'numeric' });
        });

        const data = monthlyRevenue.map(item => item.total);

        res.json({ labels, data });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching revenue data' });
    }
});

// Get payment methods distribution
router.get('/payment-methods', adminAuth, async (req, res) => {
    try {
        const paymentMethods = await Order.aggregate([
            { $match: { status: 'paid' } },
            {
                $group: {
                    _id: '$paymentMethod',
                    count: { $sum: 1 }
                }
            }
        ]);

        const labels = paymentMethods.map(method => method._id);
        const data = paymentMethods.map(method => method.count);

        res.json({ labels, data });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payment methods data' });
    }
});

module.exports = router;