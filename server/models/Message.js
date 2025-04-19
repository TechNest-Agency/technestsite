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
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied', 'archived'],
        default: 'new'
    },
    service: {
        type: String,
        trim: true
    },
    budget: {
        type: String,
        trim: true
    },
    timeline: {
        type: String,
        trim: true
    },
    attachments: [{
        filename: String,
        path: String,
        size: Number,
        mimetype: String
    }]
}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message; 