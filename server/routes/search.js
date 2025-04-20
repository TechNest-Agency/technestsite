const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Service = require('../models/Service');
const Portfolio = require('../models/Portfolio');

// Global search endpoint
router.get('/', async (req, res) => {
    try {
        const { query, type } = req.query;
        const searchRegex = new RegExp(query, 'i');

        const results = {};

        // Search blogs if no type specified or type is 'blogs'
        if (!type || type === 'blogs') {
            results.blogs = await Blog.find({
                $or: [
                    { title: searchRegex },
                    { content: searchRegex },
                    { tags: searchRegex },
                    { category: searchRegex }
                ]
            }).select('title excerpt category tags createdAt slug');
        }

        // Search services if no type specified or type is 'services'
        if (!type || type === 'services') {
            results.services = await Service.find({
                $or: [
                    { title: searchRegex },
                    { description: searchRegex },
                    { category: searchRegex }
                ]
            });
        }

        // Search portfolio if no type specified or type is 'portfolio'
        if (!type || type === 'portfolio') {
            results.portfolio = await Portfolio.find({
                $or: [
                    { title: searchRegex },
                    { description: searchRegex },
                    { technologies: searchRegex }
                ]
            });
        }

        res.json(results);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Advanced search with filters
router.post('/advanced', async (req, res) => {
    try {
        const { query, filters } = req.body;
        const searchRegex = new RegExp(query, 'i');

        const results = {};
        
        if (filters.blogs) {
            const blogQuery = {
                $or: [
                    { title: searchRegex },
                    { content: searchRegex }
                ]
            };

            if (filters.blogs.category) {
                blogQuery.category = filters.blogs.category;
            }
            if (filters.blogs.tags && filters.blogs.tags.length > 0) {
                blogQuery.tags = { $in: filters.blogs.tags };
            }
            if (filters.blogs.dateRange) {
                blogQuery.createdAt = {
                    $gte: new Date(filters.blogs.dateRange.start),
                    $lte: new Date(filters.blogs.dateRange.end)
                };
            }

            results.blogs = await Blog.find(blogQuery)
                .select('title excerpt category tags createdAt slug')
                .sort({ createdAt: -1 });
        }

        if (filters.services) {
            const serviceQuery = {
                $or: [
                    { title: searchRegex },
                    { description: searchRegex }
                ]
            };

            if (filters.services.category) {
                serviceQuery.category = filters.services.category;
            }

            results.services = await Service.find(serviceQuery)
                .sort({ order: 1 });
        }

        if (filters.portfolio) {
            const portfolioQuery = {
                $or: [
                    { title: searchRegex },
                    { description: searchRegex }
                ]
            };

            if (filters.portfolio.technologies && filters.portfolio.technologies.length > 0) {
                portfolioQuery.technologies = { $in: filters.portfolio.technologies };
            }

            results.portfolio = await Portfolio.find(portfolioQuery)
                .sort({ createdAt: -1 });
        }

        res.json(results);
    } catch (error) {
        console.error('Advanced search error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get search suggestions
router.get('/suggestions', async (req, res) => {
    try {
        const { query } = req.query;
        const searchRegex = new RegExp(query, 'i');

        const [blogs, services] = await Promise.all([
            Blog.find({ title: searchRegex })
                .select('title')
                .limit(5),
            Service.find({ title: searchRegex })
                .select('title')
                .limit(5)
        ]);

        const suggestions = {
            blogs: blogs.map(blog => blog.title),
            services: services.map(service => service.title)
        };

        res.json(suggestions);
    } catch (error) {
        console.error('Suggestions error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;