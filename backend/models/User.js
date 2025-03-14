// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }, // Note: In production, hash passwords!
        role: {
            type: String,
            enum: ['Admin', 'Cashier'],
            default: 'Cashier'
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
