require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// Import Routes
const userRoutes = require('./routes/users');
const carRoutes = require('./routes/cars');
const carFinancialRoutes = require('./routes/carfinancialdetails');

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/car-financial-details', carFinancialRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
