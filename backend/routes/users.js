// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register new user (example)
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const user = new User({ username, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login endpoint (example, without full JWT implementation)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // In production, compare hashed passwords
        const user = await User.findOne({ email, password });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
