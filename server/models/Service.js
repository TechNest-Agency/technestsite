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
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    icon: {
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
        description: String
    }],
    pricing: [{
        plan: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        features: [String],
        isPopular: {
            type: Boolean,
            default: false
        }
    }],
    technologies: [{
        type: String,
        trim: true
    }],
    testimonials: [{
        text: String,
        author: String,
        position: String,
        company: String
    }],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    meta: {
        title: String,
        description: String,
        keywords: [String]
    }
}, {
    timestamps: true
});

// Create slug from title before saving
serviceSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
    next();
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service; 