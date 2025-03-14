const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * This schema holds the financial information for a specific Car.
 * It references the Car by carId (which must be an existing document in the cars collection).
 */
const CarFinancialDetailsSchema = new Schema({
    carId: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },

    // -- User-input fields --
    dollarRatePurchaseDay: { type: Number, default: 0 },  // (B)
    freight: { type: Number, default: 0 },               // (D)
    expenseBeforeDP: { type: Number, default: 0 },        // (E)
    foreignDollarRate: { type: Number, default: 0 },      // (G)
    soldPrice: { type: Number, default: 0 },              // (I)
    customTax: { type: Number, default: 0 },              // (J)
    dpExpenseFee: { type: Number, default: 0 },           // (K)
    extraExpense: { type: Number, default: 0 },           // (L)
    clearExpense: { type: Number, default: 0 },           // (M)
    dollarRateOnSelling: { type: Number, default: 0 },    // (P)

    // -- Derived/calculated fields (can be stored or computed on-the-fly) --
    costInWon: { type: Number, default: 0 },              // (A) - can come from Car.price or user can override
    costInDollars: { type: Number, default: 0 },          // (C = A/B)
    totalCostInDollars: { type: Number, default: 0 },     // (F = C + D + E)
    costInForeign: { type: Number, default: 0 },          // (H = F * G)
    finalCost: { type: Number, default: 0 },              // (N = H + J + K + L + M)
    soldMinusFinalCost: { type: Number, default: 0 },     // (O = I - N)
    profitInDollars: { type: Number, default: 0 },        // (Q = O / P)

}, { timestamps: true });

module.exports = mongoose.model('CarFinancialDetails', CarFinancialDetailsSchema);
