const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { encrypt, decrypt } = require('../utils/security');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
        bio: String
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: Date,
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    securitySettings: {
        twoFactorEnabled: {
            type: Boolean,
            default: false
        },
        twoFactorSecret: {
            iv: String,
            encrypted: String,
            authTag: String
        },
        allowedIPs: [{
            ip: String,
            lastUsed: Date
        }],
        allowedDevices: [{
            deviceId: String,
            deviceName: String,
            lastUsed: Date
        }]
    },
    sessions: [{
        token: String,
        device: String,
        ip: String,
        lastUsed: Date,
        expiresAt: Date
    }],
    personalInfo: {
        phoneNumber: {
            iv: String,
            encrypted: String,
            authTag: String
        },
        address: {
            iv: String,
            encrypted: String,
            authTag: String
        }
    },
    twoFactorEnabled: {
        type: Boolean,
        default: false
    },
    twoFactorSecret: {
        type: String
    },
    twoFactorBackupCodes: [{
        type: String
    }],
    active: {
        type: Boolean,
        default: true
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Encrypt sensitive data before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('profile.phoneNumber')) {
        const encrypted = encrypt(this.profile.phoneNumber);
        this.personalInfo.phoneNumber = encrypted;
    }
    
    if (this.isModified('profile.address')) {
        const encrypted = encrypt(this.profile.address);
        this.personalInfo.address = encrypted;
    }
    
    if (this.isModified('securitySettings.twoFactorSecret')) {
        const encrypted = encrypt(this.securitySettings.twoFactorSecret);
        this.securitySettings.twoFactorSecret = encrypted;
    }
    
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate email verification token
userSchema.methods.generateEmailVerificationToken = function() {
    const token = crypto.randomBytes(20).toString('hex');
    this.emailVerificationToken = token;
    this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    return token;
};

// Method to generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
    const token = crypto.randomBytes(20).toString('hex');
    this.passwordResetToken = token;
    this.passwordResetExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    return token;
};

// Method to check if account is locked
userSchema.methods.isLocked = function() {
    return this.lockUntil && this.lockUntil > Date.now();
};

// Method to increment login attempts
userSchema.methods.incrementLoginAttempts = async function() {
    if (this.lockUntil && this.lockUntil < Date.now()) {
        this.loginAttempts = 0;
        this.lockUntil = undefined;
    }
    
    this.loginAttempts += 1;
    
    if (this.loginAttempts >= 5) {
        this.lockUntil = Date.now() + 30 * 60 * 1000; // 30 minutes
    }
    
    await this.save();
};

// Method to validate device and IP
userSchema.methods.isDeviceAllowed = function(deviceId, ip) {
    const isIPAllowed = this.securitySettings.allowedIPs.some(
        entry => entry.ip === ip && entry.lastUsed > Date.now() - 30 * 24 * 60 * 60 * 1000 // 30 days
    );
    
    const isDeviceAllowed = this.securitySettings.allowedDevices.some(
        device => device.deviceId === deviceId && device.lastUsed > Date.now() - 30 * 24 * 60 * 60 * 1000
    );
    
    return isIPAllowed && isDeviceAllowed;
};

// Method to add new device
userSchema.methods.addAllowedDevice = async function(deviceId, deviceName, ip) {
    // Update or add device
    const existingDevice = this.securitySettings.allowedDevices.find(d => d.deviceId === deviceId);
    if (existingDevice) {
        existingDevice.lastUsed = new Date();
        existingDevice.deviceName = deviceName;
    } else {
        this.securitySettings.allowedDevices.push({
            deviceId,
            deviceName,
            lastUsed: new Date()
        });
    }
    
    // Update or add IP
    const existingIP = this.securitySettings.allowedIPs.find(entry => entry.ip === ip);
    if (existingIP) {
        existingIP.lastUsed = new Date();
    } else {
        this.securitySettings.allowedIPs.push({
            ip,
            lastUsed: new Date()
        });
    }
    
    await this.save();
};

// Method to manage sessions
userSchema.methods.addSession = async function(token, device, ip) {
    this.sessions.push({
        token,
        device,
        ip,
        lastUsed: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });
    
    // Clean up expired sessions
    this.sessions = this.sessions.filter(session => session.expiresAt > Date.now());
    
    await this.save();
};

// Method to validate session
userSchema.methods.isValidSession = function(token) {
    const session = this.sessions.find(s => s.token === token);
    return session && session.expiresAt > Date.now();
};

// Method to revoke all sessions except current
userSchema.methods.revokeOtherSessions = async function(currentToken) {
    this.sessions = this.sessions.filter(session => session.token === currentToken);
    await this.save();
};

// Method to get decrypted personal info
userSchema.methods.getDecryptedInfo = function() {
    const info = {};
    
    if (this.personalInfo.phoneNumber) {
        info.phoneNumber = decrypt(
            this.personalInfo.phoneNumber.encrypted,
            this.personalInfo.phoneNumber.iv,
            this.personalInfo.phoneNumber.authTag
        );
    }
    
    if (this.personalInfo.address) {
        info.address = decrypt(
            this.personalInfo.address.encrypted,
            this.personalInfo.address.iv,
            this.personalInfo.address.authTag
        );
    }
    
    return info;
};

const User = mongoose.model('User', userSchema);

module.exports = User;