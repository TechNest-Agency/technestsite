const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Service = require('../models/Service');
const { auth, adminAuth } = require('../middleware/auth');

// Get all published services
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const query = { status: 'published' };

        if (category) query.category = category;

        const services = await Service.find(query).sort({ createdAt: -1 });
        res.json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get service by slug
router.get('/:slug', async (req, res) => {
    try {
        const service = await Service.findOne({ slug: req.params.slug });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new service (Admin only)
router.post('/', [
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
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update service (Admin only)
router.put('/:id', [
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

// Delete service (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        await service.remove();
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 