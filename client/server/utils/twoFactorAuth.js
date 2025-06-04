const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const { encrypt, decrypt } = require('./security');

// Generate secret for 2FA
exports.generateSecret = (email) => {
    const secret = speakeasy.generateSecret({
        name: `TechNest:${email}`
    });
    return {
        base32: secret.base32,
        otpauth_url: secret.otpauth_url
    };
};

// Generate QR code for 2FA setup
exports.generateQRCode = async (otpauthUrl) => {
    try {
        const qrCodeUrl = await QRCode.toDataURL(otpauthUrl);
        return qrCodeUrl;
    } catch (error) {
        throw new Error('Error generating QR code');
    }
};

// Verify 2FA token
exports.verifyToken = (token, secret) => {
    return speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 1 // Allow 30 seconds window
    });
};

// Generate backup codes
exports.generateBackupCodes = () => {
    const codes = [];
    for (let i = 0; i < 10; i++) {
        codes.push(speakeasy.generateSecret({ length: 10 }).base32.substr(0, 10));
    }
    return codes;
};

const encrypt2FASecret = (secret) => {
    return encrypt(secret);
};

const decrypt2FASecret = (encryptedSecret) => {
    return decrypt(
        encryptedSecret.encrypted,
        encryptedSecret.iv,
        encryptedSecret.authTag
    );
};

module.exports = {
    generateSecret: exports.generateSecret,
    generateQRCode: exports.generateQRCode,
    verifyToken: exports.verifyToken,
    generateBackupCodes: exports.generateBackupCodes,
    encrypt2FASecret,
    decrypt2FASecret
};