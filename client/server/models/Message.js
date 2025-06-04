const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied', 'spam'],
        default: 'new'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    source: {
        type: String,
        enum: ['contact_form', 'chat', 'email', 'phone'],
        default: 'contact_form'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    replies: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    notes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    metadata: {
        ip: String,
        userAgent: String,
        referrer: String,
        location: {
            country: String,
            city: String
        }
    },
    tags: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true
});

// Add indexes for better query performance
messageSchema.index({ status: 1 });
messageSchema.index({ priority: 1 });
messageSchema.index({ createdAt: -1 });
messageSchema.index({ email: 1 });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message; 