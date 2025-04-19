const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Portfolio = require('../models/Portfolio');
const { auth, adminAuth } = require('../middleware/auth');

// Get all published portfolio items
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 9, category } = req.query;
        const query = { status: 'published' };

        if (category) query.category = category;

        const portfolios = await Portfolio.find(query)
            .sort({ publishedAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Portfolio.countDocuments(query);

        res.json({
            portfolios,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single portfolio item by slug
router.get('/:slug', async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ slug: req.params.slug });

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio item not found' });
        }

        res.json(portfolio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new portfolio item (Admin only)
router.post('/', [
    auth,
    adminAuth,
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('shortDescription').trim().notEmpty(),
    body('featuredImage').trim().notEmpty(),
    body('category').isIn(['web', 'app', 'ai', 'cybersecurity', 'marketing', 'cloud']),
    body('technologies').isArray(),
    body('features').isArray(),
    body('challenges').isArray(),
    body('results').isArray()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const portfolio = new Portfolio(req.body);
        await portfolio.save();

        res.status(201).json(portfolio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update portfolio item (Admin only)
router.put('/:id', [
    auth,
    adminAuth,
    body('title').optional().trim().notEmpty(),
    body('description').optional().trim().notEmpty(),
    body('shortDescription').optional().trim().notEmpty(),
    body('featuredImage').optional().trim().notEmpty(),
    body('category').optional().isIn(['web', 'app', 'ai', 'cybersecurity', 'marketing', 'cloud']),
    body('technologies').optional().isArray(),
    body('features').optional().isArray(),
    body('challenges').optional().isArray(),
    body('results').optional().isArray()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio item not found' });
        }

        Object.assign(portfolio, req.body);
        await portfolio.save();

        res.json(portfolio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete portfolio item (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio item not found' });
        }

        await portfolio.remove();
        res.json({ message: 'Portfolio item deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get portfolio categories
router.get('/categories/all', async (req, res) => {
    try {
        const categories = await Portfolio.distinct('category');
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 