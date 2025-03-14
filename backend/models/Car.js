const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number },
    mileageRange: { type: String },
    price: { type: Number },
    transmission: { type: String, enum: ['Automatic', 'Manual'], default: 'Automatic' },
    fuelType: { type: String, enum: ['Carbulant', 'Diesel', 'Electric', 'Hybrid', 'Petrol PHEV', 'Other'], default: 'Carbulant' },
    autonomy: { type: String },
    seats: { type: Number },

    bodyType: { type: String, enum: ['Sedan', 'SUV', 'Hatchback', 'Truck', 'Coupe', 'Convertible', 'Van', 'Other'], default: 'Sedan' },
    numberOfKeys: { type: Number },
    exteriorColor: { type: String },
    interiorColor: { type: String },
    numberOfOwners: { type: Number },
    condition: { type: String, enum: ['Excellent', 'Good', 'Average', 'Damaged'], default: 'Excellent' },

    images: [{ type: String }],
    status: { type: String, enum: ['pending', 'available', 'sold'], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);
