const express = require('express');
const router = express.Router();
const CarFinancialDetails = require('../models/CarFinancialDetails');
const Car = require('../models/Car');

// POST /api/car-financial-details
router.post('/', async (req, res) => {
    try {
        const {
            carId,
            costInWon,
            dollarRatePurchaseDay,
            freight,
            expenseBeforeDP,
            foreignDollarRate,
            soldPrice,
            customTax,
            dpExpenseFee,
            extraExpense,
            clearExpense,
            dollarRateOnSelling
        } = req.body;

        // Ensure car exists
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ error: 'Car not found. Invalid carId.' });
        }

        // Perform calculations
        const costInDollars = dollarRatePurchaseDay > 0 ? costInWon / dollarRatePurchaseDay : 0;
        const totalCostInDollars = costInDollars + (freight || 0) + (expenseBeforeDP || 0);
        const costInForeign = totalCostInDollars * (foreignDollarRate || 0);
        const finalCost = costInForeign + (customTax || 0) + (dpExpenseFee || 0) + (extraExpense || 0) + (clearExpense || 0);
        const soldMinusFinalCost = (soldPrice || 0) - finalCost;
        const profitInDollars = dollarRateOnSelling > 0 ? soldMinusFinalCost / dollarRateOnSelling : 0;

        // Create financial record
        const newFinancialRecord = await CarFinancialDetails.create({
            carId,
            costInWon,
            dollarRatePurchaseDay,
            freight,
            expenseBeforeDP,
            foreignDollarRate,
            soldPrice,
            customTax,
            dpExpenseFee,
            extraExpense,
            clearExpense,
            dollarRateOnSelling,
            costInDollars,
            totalCostInDollars,
            costInForeign,
            finalCost,
            soldMinusFinalCost,
            profitInDollars
        });

        res.status(201).json({
            message: 'Car financial details saved successfully',
            financial: newFinancialRecord
        });
    } catch (error) {
        console.error('Error creating car financial details:', error);
        res.status(500).json({ error: 'Failed to create car financial details.' });
    }
});


router.get('/:carId', async (req, res) => {
    try {
        const car = await Car.findById(req.params.carId);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        const financialDetails = await CarFinancialDetails.findOne({ carId: req.params.carId });

        res.status(200).json({
            car,
            financial: financialDetails || null // If no financial details exist, return null
        });
    } catch (error) {
        console.error('Error fetching car details:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
