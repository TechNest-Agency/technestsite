const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const { uploadImage } = require('../utils/imageUpload');

// Get all published blog posts
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category;
        const tag = req.query.tag;

        const query = { status: 'published' };
        if (category) query.categories = category;
        if (tag) query.tags = tag;

        const [posts, total] = await Promise.all([
            Blog.find(query)
                .populate('author', 'name')
                .sort({ publishedAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .select('-content'),
            Blog.countDocuments(query)
        ]);

        res.json({
            posts,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blog posts' });
    }
});

// Get a single blog post by slug
router.get('/:slug', async (req, res) => {
    try {
        const post = await Blog.findOne({
            slug: req.params.slug,
            status: 'published'
        }).populate('author', 'name');

        if (!post) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        // Increment view count
        post.views += 1;
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blog post' });
    }
});

// Create a new blog post (admin only)
router.post('/', adminAuth, uploadImage.single('featuredImage'), async (req, res) => {
    try {
        const { title, content, excerpt, categories, tags, status } = req.body;

        const post = new Blog({
            title,
            content,
            excerpt,
            categories: categories ? categories.split(',').map(cat => cat.trim()) : [],
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            author: req.user._id,
            status,
            featuredImage: req.file ? `/uploads/${req.file.filename}` : undefined,
            publishedAt: status === 'published' ? new Date() : undefined
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error creating blog post' });
    }
});

// Update a blog post (admin only)
router.put('/:id', adminAuth, uploadImage.single('featuredImage'), async (req, res) => {
    try {
        const { title, content, excerpt, categories, tags, status } = req.body;
        const post = await Blog.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        post.title = title || post.title;
        post.content = content || post.content;
        post.excerpt = excerpt || post.excerpt;
        if (categories) post.categories = categories.split(',').map(cat => cat.trim());
        if (tags) post.tags = tags.split(',').map(tag => tag.trim());
        if (req.file) post.featuredImage = `/uploads/${req.file.filename}`;
        
        if (status && status !== post.status) {
            post.status = status;
            if (status === 'published') {
                post.publishedAt = new Date();
            }
        }

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error updating blog post' });
    }
});

// Delete a blog post (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const post = await Blog.findByIdAndDelete(req.params.id);
        
        if (!post) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting blog post' });
    }
});

// Search blog posts
router.get('/search/:query', async (req, res) => {
    try {
        const posts = await Blog.find(
            { 
                $text: { $search: req.params.query },
                status: 'published'
            },
            { score: { $meta: 'textScore' } }
        )
            .sort({ score: { $meta: 'textScore' } })
            .populate('author', 'name')
            .select('-content');

        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error searching blog posts' });
    }
});

module.exports = router;
