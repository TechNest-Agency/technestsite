const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');
const courseController = require('../controllers/courseController');
const { uploadImage } = require('../utils/imageUpload');

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/:slug', courseController.getCourse);

// Protected routes
router.post('/',
    auth,
    adminAuth,
    uploadImage.single('thumbnail'),
    courseController.createCourse
);

// Only admin can modify courses
router.put('/:id',
    auth,
    adminAuth,
    uploadImage.single('thumbnail'),
    courseController.createCourse
);

router.delete('/:id',
    auth,
    adminAuth,
    courseController.createCourse
);

module.exports = router;