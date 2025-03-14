// routes/cars.js
const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// Create new car
router.post('/', async (req, res) => {
    try {
        const carData = req.body;
        const car = new Car(carData);
        await car.save();
        res.status(201).json({ message: 'Car added successfully', car });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single car by ID
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.status(200).json(car);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a car (for future actions like updating status or profit calculation)
router.put('/:id', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCar) return res.status(404).json({ message: 'Car not found' });
        res.status(200).json(updatedCar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a car
router.delete('/:id', async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        if (!deletedCar) return res.status(404).json({ message: 'Car not found' });
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
