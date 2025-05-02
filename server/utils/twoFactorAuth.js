const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { encrypt, decrypt } = require('./security');

const generateSecret = async () => {
    const secret = speakeasy.generateSecret({
        name: 'TechNest',
        length: 20
    });

    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

    return {
        secret: secret.base32,
        qrCode: qrCodeUrl
    };
};

const verifyToken = (token, secret) => {
    return speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 1 // Allow 30 seconds clock drift
    });
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
    generateSecret,
    verifyToken,
    encrypt2FASecret,
    decrypt2FASecret
};