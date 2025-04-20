const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Course = require('../models/Course');
const { auth, adminAuth } = require('../middleware/auth');

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find({ status: 'active' })
            .sort({ createdAt: -1 });
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single course
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a course (Admin only)
router.post('/', [
    auth,
    adminAuth,
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('duration').trim().notEmpty(),
    body('instructor').trim().notEmpty(),
    body('image').trim().notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a course (Admin only)
router.put('/:id', [
    auth,
    adminAuth,
    body('title').optional().trim().notEmpty(),
    body('description').optional().trim().notEmpty(),
    body('price').optional().isFloat({ min: 0 }),
    body('duration').optional().trim().notEmpty(),
    body('instructor').optional().trim().notEmpty(),
    body('image').optional().trim().notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a course (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;