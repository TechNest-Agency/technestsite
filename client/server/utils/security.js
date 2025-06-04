const crypto = require('crypto');
const mongoose = require('mongoose');

// Encryption configuration
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32);
const IV_LENGTH = 16;
const ALGORITHM = 'aes-256-gcm';

// Security audit schema
const SecurityAuditSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true
    },
    ip: String,
    userAgent: String,
    resourceType: String,
    resourceId: mongoose.Schema.Types.ObjectId,
    status: {
        type: String,
        enum: ['success', 'failure'],
        required: true
    },
    details: Object,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const SecurityAudit = mongoose.model('SecurityAudit', SecurityAuditSchema);

// Encryption utilities
const encrypt = (text) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
        iv: iv.toString('hex'),
        encrypted: encrypted,
        authTag: authTag.toString('hex')
    };
};

const decrypt = (encrypted, iv, authTag) => {
    const decipher = crypto.createDecipheriv(
        ALGORITHM, 
        Buffer.from(ENCRYPTION_KEY),
        Buffer.from(iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
};

// Security headers configuration
const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline';",
    'Referrer-Policy': 'same-origin',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

// Security audit utility
const auditLog = async (userId, action, status, details = {}) => {
    try {
        const audit = new SecurityAudit({
            userId,
            action,
            status,
            ip: details.ip || 'unknown',
            userAgent: details.userAgent || 'unknown',
            resourceType: details.resourceType,
            resourceId: details.resourceId,
            details: {
                ...details,
                // Remove sensitive data
                password: undefined,
                token: undefined,
                key: undefined
            }
        });
        
        await audit.save();
    } catch (error) {
        console.error('Security audit logging failed:', error);
    }
};

// Data minimization utility
const sanitizeUserData = (userData) => {
    const allowedFields = [
        '_id',
        'name',
        'email',
        'role',
        'avatar',
        'createdAt',
        'updatedAt'
    ];
    
    return Object.keys(userData)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
            obj[key] = userData[key];
            return obj;
        }, {});
};

// Rate limiting configuration
const rateLimit = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
};

module.exports = {
    encrypt,
    decrypt,
    auditLog,
    sanitizeUserData,
    rateLimit,
    securityHeaders,
    SecurityAudit
};