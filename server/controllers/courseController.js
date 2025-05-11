const Course = require('../models/Course');
const User = require('../models/User');
const mongoose = require('mongoose');

// Get all published courses
exports.getAllCourses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category;
        const level = req.query.level;
        const search = req.query.search;

        let query = { status: 'published' };
        if (category) query.category = category;
        if (level) query.level = level;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const courses = await Course.find(query)
            .populate('instructor', 'name')
            .skip((page - 1) * limit)
            .limit(limit)
            .sort('-createdAt');

        const total = await Course.countDocuments(query);

        res.json({
            courses,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching courses' });
    }
};

// Get single course by slug
exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug, status: 'published' })
            .populate('instructor', 'name email')
            .populate('reviews.user', 'name');

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json(course);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching course' });
    }
};

// Create new course (instructor/admin only)
exports.createCourse = async (req, res) => {
    try {
        const course = new Course({
            ...req.body,
            instructor: req.user._id
        });

        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: 'Error creating course' });
    }
};

// Update course (instructor/admin only)
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if user is instructor or admin
        if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        Object.assign(course, req.body);
        await course.save();

        res.json(course);
    } catch (error) {
        res.status(500).json({ error: 'Error updating course' });
    }
};

// Delete course (instructor/admin only)
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if user is instructor or admin
        if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await course.remove();
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting course' });
    }
};

// Enroll in course
exports.enrollCourse = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const course = await Course.findById(req.params.id).session(session);
        if (!course) {
            await session.abortTransaction();
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if user is already enrolled
        const isEnrolled = course.enrolledStudents.some(
            enrollment => enrollment.student.toString() === req.user._id.toString()
        );

        if (isEnrolled) {
            await session.abortTransaction();
            return res.status(400).json({ error: 'Already enrolled in this course' });
        }

        // Add student to course
        course.enrolledStudents.push({
            student: req.user._id,
            progress: 0,
            completedLessons: []
        });

        // Add course to user's enrolled courses
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { enrolledCourses: course._id } },
            { session }
        );

        await course.save({ session });
        await session.commitTransaction();

        res.json({ message: 'Successfully enrolled in course' });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ error: 'Error enrolling in course' });
    } finally {
        session.endSession();
    }
};

// Update course progress
exports.updateProgress = async (req, res) => {
    try {
        const { lessonId } = req.body;
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const enrollment = course.enrolledStudents.find(
            enrollment => enrollment.student.toString() === req.user._id.toString()
        );

        if (!enrollment) {
            return res.status(403).json({ error: 'Not enrolled in this course' });
        }

        if (!enrollment.completedLessons.includes(lessonId)) {
            enrollment.completedLessons.push(lessonId);

            // Calculate progress percentage
            const totalLessons = course.modules.reduce(
                (total, module) => total + module.lessons.length,
                0
            );
            enrollment.progress = (enrollment.completedLessons.length / totalLessons) * 100;

            await course.save();
        }

        res.json({
            progress: enrollment.progress,
            completedLessons: enrollment.completedLessons
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating progress' });
    }
};

// Add review to course
exports.addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if user is enrolled
        const isEnrolled = course.enrolledStudents.some(
            enrollment => enrollment.student.toString() === req.user._id.toString()
        );

        if (!isEnrolled) {
            return res.status(403).json({ error: 'Must be enrolled to review' });
        }

        // Check if user has already reviewed
        const hasReviewed = course.reviews.some(
            review => review.user.toString() === req.user._id.toString()
        );

        if (hasReviewed) {
            return res.status(400).json({ error: 'Already reviewed this course' });
        }

        course.reviews.push({
            user: req.user._id,
            rating,
            comment
        });

        await course.updateRating();
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: 'Error adding review' });
    }
};