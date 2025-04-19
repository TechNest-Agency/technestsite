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
        const [totalPosts, totalServices, totalUsers, totalMessages] = await Promise.all([
            Blog.countDocuments(),
            Service.countDocuments(),
            User.countDocuments(),
            Message.countDocuments()
        ]);

        res.json({
            stats: {
                totalPosts,
                totalServices,
                totalUsers,
                totalMessages
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all posts (including drafts)
router.get('/posts', [auth, adminAuth], async (req, res) => {
    try {
        const posts = await Blog.find()
            .sort({ createdAt: -1 })
            .populate('author', 'username profile');

        res.json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all services
router.get('/services', [auth, adminAuth], async (req, res) => {
    try {
        const services = await Service.find()
            .sort({ createdAt: -1 });

        res.json({ services });
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Error fetching services' });
    }
});

// Create new service
router.post('/services', [
    auth,
    adminAuth,
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('shortDescription').trim().notEmpty(),
    body('icon').trim().notEmpty(),
    body('category').isIn(['web', 'app', 'ai', 'cybersecurity', 'marketing', 'cloud']),
    body('features').isArray(),
    body('pricing').isArray(),
    body('technologies').isArray()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const service = new Service(req.body);
        await service.save();

        res.status(201).json(service);
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ message: 'Error creating service' });
    }
});

// Update service
router.put('/services/:id', [
    auth,
    adminAuth,
    body('title').optional().trim().notEmpty(),
    body('description').optional().trim().notEmpty(),
    body('shortDescription').optional().trim().notEmpty(),
    body('icon').optional().trim().notEmpty(),
    body('category').optional().isIn(['web', 'app', 'ai', 'cybersecurity', 'marketing', 'cloud']),
    body('features').optional().isArray(),
    body('pricing').optional().isArray(),
    body('technologies').optional().isArray()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        
        res.json(service);
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Error updating service' });
    }
});

// Delete service
router.delete('/services/:id', [auth, adminAuth], async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ message: 'Error deleting service' });
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
        const settings = {
            siteTitle: process.env.SITE_TITLE,
            siteDescription: process.env.SITE_DESCRIPTION,
            contactEmail: process.env.CONTACT_EMAIL,
            smtpHost: process.env.SMTP_HOST,
            smtpPort: process.env.SMTP_PORT,
            smtpUsername: process.env.SMTP_USER,
            smtpPassword: process.env.SMTP_PASS
        };

        res.json(settings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update settings
router.put('/settings', [
    auth,
    adminAuth,
    body('siteTitle').optional().trim().notEmpty(),
    body('siteDescription').optional().trim().notEmpty(),
    body('contactEmail').optional().isEmail(),
    body('smtpHost').optional().trim().notEmpty(),
    body('smtpPort').optional().isInt(),
    body('smtpUsername').optional().trim().notEmpty(),
    body('smtpPassword').optional().trim().notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Update environment variables
        const envPath = path.join(__dirname, '../.env');
        let envContent = fs.readFileSync(envPath, 'utf8');

        Object.entries(req.body).forEach(([key, value]) => {
            const regex = new RegExp(`^${key}=.*$`, 'm');
            if (envContent.match(regex)) {
                envContent = envContent.replace(regex, `${key}=${value}`);
            } else {
                envContent += `\n${key}=${value}`;
            }
        });

        fs.writeFileSync(envPath, envContent);

        // Reload environment variables
        dotenv.config();

        res.json({ message: 'Settings updated successfully' });
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

module.exports = router; 