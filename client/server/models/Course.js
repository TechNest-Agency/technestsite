const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    topics: [{
        type: String,
        trim: true
    }],
    requirements: [{
        type: String,
        trim: true
    }],
    modules: [{
        title: {
            type: String,
            required: true
        },
        description: String,
        lessons: [{
            title: {
                type: String,
                required: true
            },
            type: {
                type: String,
                enum: ['video', 'quiz', 'assignment'],
                required: true
            },
            content: {
                type: String, // Video URL or quiz/assignment content
                required: true
            },
            duration: Number, // in minutes (for videos)
            order: Number
        }]
    }],
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    enrolledStudents: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        enrolledAt: {
            type: Date,
            default: Date.now
        },
        progress: {
            type: Number,
            default: 0
        },
        completedLessons: [{
            type: String // Lesson IDs
        }]
    }],
    rating: {
        average: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    category: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    language: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Pre-save hook to generate slug
courseSchema.pre('save', function(next) {
    if (!this.isModified('title')) {
        return next();
    }

    this.slug = this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    
    next();
});

// Pre-save hook to update lastUpdated
courseSchema.pre('save', function(next) {
    this.lastUpdated = new Date();
    next();
});

// Method to calculate and update average rating
courseSchema.methods.updateRating = async function() {
    if (this.reviews.length === 0) {
        this.rating.average = 0;
        this.rating.count = 0;
    } else {
        const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        this.rating.average = total / this.reviews.length;
        this.rating.count = this.reviews.length;
    }
    await this.save();
};

module.exports = mongoose.model('Course', courseSchema);