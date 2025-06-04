const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
  register,
  TwoFactorVerify,
  login,
} = require("../controllers/authController");
const crypto = require("crypto");
const { transporter } = require("../utils/nodeMailService");
const { authRateLimiter } = require("../middleware/auth");

// Setup admin account
router.post("/setup-admin", async (req, res) => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      return res.json({ message: "Admin already exists" });
    }

    // const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = new User({
      username: "admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASS,
      role: "admin",
      isEmailVerified: true,
    });

    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Admin setup error:", error);
    res.status(500).json({ message: "Error creating admin" });
  }
});

// login route
router.post("/login", authRateLimiter, login);

// register route
router.post("/register", register);

// two 2fa route
router.post("/2fa/verify", TwoFactorVerify);

module.exports = router;
