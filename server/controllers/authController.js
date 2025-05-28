const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateTOTP, verifyTOTP } = require('../utils/twoFactorAuth');

// Register new user
exports.register = async (req, res) => {
    try {
        const { username, email, password, role = 'user' } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        // Generate TOTP secret for 2FA
        const totpSecret = generateTOTP();
        user.twoFactorSecret = totpSecret;
        await user.save();

        res.status(201).json({ 
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password, totpCode } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify 2FA if enabled
        if (user.isTwoFactorEnabled) {
            if (!totpCode) {
                return res.status(403).json({ 
                    message: 'Two-factor authentication required',
                    requiresTwoFactor: true 
                });
            }

            const isValidTOTP = verifyTOTP(totpCode, user.twoFactorSecret);
            if (!isValidTOTP) {
                return res.status(401).json({ message: 'Invalid 2FA code' });
            }
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user._id,
                role: user.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                isTwoFactorEnabled: user.isTwoFactorEnabled
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// Logout user
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password -twoFactorSecret');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ message: 'Server error while fetching user' });
    }
};

// Enable/Disable 2FA
exports.toggleTwoFactor = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isTwoFactorEnabled = !user.isTwoFactorEnabled;
        await user.save();

        res.json({ 
            message: `Two-factor authentication ${user.isTwoFactorEnabled ? 'enabled' : 'disabled'}`,
            isTwoFactorEnabled: user.isTwoFactorEnabled
        });
    } catch (error) {
        console.error('Toggle 2FA error:', error);
        res.status(500).json({ message: 'Server error while toggling 2FA' });
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify old password
        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid current password' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error while resetting password' });
    }
};
