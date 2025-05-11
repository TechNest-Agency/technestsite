const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
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

router.put('/:id',
    auth,
    adminAuth,
    uploadImage.single('thumbnail'),
    courseController.updateCourse
);

router.delete('/:id',
    auth,
    adminAuth,
    courseController.deleteCourse
);

// Student routes
router.post('/:id/enroll',
    auth,
    courseController.enrollCourse
);

router.post('/:id/progress',
    auth,
    courseController.updateProgress
);

router.post('/:id/review',
    auth,
    courseController.addReview
);

module.exports = router;