const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
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
    content: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categories: [{
        type: String,
        trim: true
    }],
    tags: [{
        type: String,
        trim: true
    }],
    featuredImage: {
        type: String
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    publishedAt: {
        type: Date
    },
    views: {
        type: Number,
        default: 0
    },
    readTime: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

// Create text index for search
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });

// Pre-save hook to generate slug
blogSchema.pre('save', function(next) {
    if (!this.isModified('title')) {
        return next();
    }

    this.slug = this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    
    next();
});

// Calculate read time before saving
blogSchema.pre('save', function(next) {
    if (!this.isModified('content')) {
        return next();
    }

    const wordsPerMinute = 200;
    const wordCount = this.content.trim().split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
    
    next();
});

module.exports = mongoose.model('Blog', blogSchema);
