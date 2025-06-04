const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const Message = require('../models/Message');
const { auth, adminAuth } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/messages');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Submit contact form
router.post('/', [
    body('name').trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('subject').trim().notEmpty(),
    body('message').trim().notEmpty(),
    upload.array('attachments', 3)
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, subject, message, service, budget, timeline } = req.body;
        const attachments = req.files?.map(file => ({
            filename: file.originalname,
            path: file.path,
            size: file.size,
            mimetype: file.mimetype
        })) || [];

        const newMessage = new Message({
            name,
            email,
            subject,
            message,
            service,
            budget,
            timeline,
            attachments
        });

        await newMessage.save();

        // Send email notification to admin
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong> ${message}</p>
                ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
                ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
                ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
            `
        });

        // Send confirmation email to user
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: email,
            subject: 'Thank you for contacting TechNest Solutions',
            html: `
                <h2>Thank you for contacting TechNest Solutions</h2>
                <p>Dear ${name},</p>
                <p>We have received your message and will get back to you shortly.</p>
                <p>Here's a copy of your message:</p>
                <blockquote>${message}</blockquote>
                <p>Best regards,<br>TechNest Solutions Team</p>
            `
        });

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all messages (Admin only)
router.get('/', [auth, adminAuth], async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const query = status ? { status } : {};

        const messages = await Message.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Message.countDocuments(query);

        res.json({
            messages,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get message by ID (Admin only)
router.get('/:id', [auth, adminAuth], async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Mark as read if it's new
        if (message.status === 'new') {
            message.status = 'read';
            await message.save();
        }

        res.json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update message status (Admin only)
router.patch('/:id/status', [auth, adminAuth], async (req, res) => {
    try {
        const { status } = req.body;
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        message.status = status;
        await message.save();

        res.json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reply to message (Admin only)
router.post('/:id/reply', [auth, adminAuth], async (req, res) => {
    try {
        const { reply } = req.body;
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Send reply email
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: message.email,
            subject: `Re: ${message.subject}`,
            html: `
                <h2>Re: ${message.subject}</h2>
                <p>Dear ${message.name},</p>
                <p>${reply}</p>
                <p>Best regards,<br>TechNest Solutions Team</p>
            `
        });

        message.status = 'replied';
        await message.save();

        res.json({ message: 'Reply sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete message (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Delete attachments if any
        if (message.attachments.length > 0) {
            const fs = require('fs');
            message.attachments.forEach(attachment => {
                if (fs.existsSync(attachment.path)) {
                    fs.unlinkSync(attachment.path);
                }
            });
        }

        await message.remove();
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 