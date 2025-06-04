const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
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
    shortDescription: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    icon: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'app', 'ai', 'cybersecurity', 'marketing', 'cloud']
    },
    features: [{
        title: String,
        description: String,
        icon: String
    }],
    technologies: [{
        name: String,
        icon: String,
        proficiency: {
            type: Number,
            min: 0,
            max: 100
        }
    }],
    pricing: [{
        plan: String,
        price: Number,
        duration: String,
        features: [String],
        isPopular: Boolean
    }],
    portfolio: [{
        title: String,
        description: String,
        image: String,
        link: String,
        technologies: [String]
    }],
    testimonials: [{
        name: String,
        position: String,
        company: String,
        image: String,
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        review: String
    }],
    faq: [{
        question: String,
        answer: String
    }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'active'
    },
    seo: {
        metaTitle: String,
        metaDescription: String,
        keywords: [String],
        ogImage: String
    },
    stats: {
        views: {
            type: Number,
            default: 0
        },
        inquiries: {
            type: Number,
            default: 0
        },
        completedProjects: {
            type: Number,
            default: 0
        },
        rating: {
            type: Number,
            default: 0
        }
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Create slug from title before saving
serviceSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        this.slug = this.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    }
    next();
});

// Add indexes for better query performance
serviceSchema.index({ slug: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ status: 1 });
serviceSchema.index({ order: 1 });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service; 