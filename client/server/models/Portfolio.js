const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
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
    featuredImage: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    client: {
        name: String,
        logo: String,
        website: String
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'app', 'ai', 'cybersecurity', 'marketing', 'cloud']
    },
    technologies: [{
        type: String,
        trim: true
    }],
    features: [{
        title: String,
        description: String
    }],
    challenges: [{
        title: String,
        description: String,
        solution: String
    }],
    results: [{
        metric: String,
        value: String,
        description: String
    }],
    testimonial: {
        text: String,
        author: String,
        position: String,
        company: String
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    publishedAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Create slug from title before saving
portfolioSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
    next();
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio; 