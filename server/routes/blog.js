const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Blog = require('../models/Blog');
const { auth, adminAuth } = require('../middleware/auth');

// Get all published blog posts
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, category, tag } = req.query;
        const query = { status: 'published' };

        if (category) query.categories = category;
        if (tag) query.tags = tag;

        const blogs = await Blog.find(query)
            .sort({ publishedAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('author', 'username profile');

        const total = await Blog.countDocuments(query);

        res.json({
            blogs,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single blog post by slug
router.get('/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug })
            .populate('author', 'username profile');

        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Increment views
        blog.views += 1;
        await blog.save();

        res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new blog post (Admin only)
router.post('/', [
    auth,
    adminAuth,
    body('title').trim().notEmpty(),
    body('content').trim().notEmpty(),
    body('excerpt').trim().notEmpty(),
    body('featuredImage').trim().notEmpty(),
    body('categories').isArray(),
    body('tags').isArray()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const blog = new Blog({
            ...req.body,
            author: req.user._id
        });

        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update blog post (Admin only)
router.put('/:id', [
    auth,
    adminAuth,
    body('title').optional().trim().notEmpty(),
    body('content').optional().trim().notEmpty(),
    body('excerpt').optional().trim().notEmpty(),
    body('featuredImage').optional().trim().notEmpty(),
    body('categories').optional().isArray(),
    body('tags').optional().isArray()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        Object.assign(blog, req.body);
        await blog.save();

        res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete blog post (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        await blog.remove();
        res.json({ message: 'Blog post deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get blog categories
router.get('/categories/all', async (req, res) => {
    try {
        const categories = await Blog.distinct('categories');
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get blog tags
router.get('/tags/all', async (req, res) => {
    try {
        const tags = await Blog.distinct('tags');
        res.json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 