const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const checkAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Find admin user
        const admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            console.log('No admin user found');
            return;
        }

        console.log('Admin user found:');
        console.log('Email:', admin.email);
        console.log('Username:', admin.username);
        console.log('Role:', admin.role);
        console.log('Is Email Verified:', admin.isEmailVerified);

        process.exit(0);
    } catch (error) {
        console.error('Error checking admin user:', error);
        process.exit(1);
    }
};

checkAdmin(); 