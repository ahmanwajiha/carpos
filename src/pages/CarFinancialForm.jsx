import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { useNavigate } from 'react-router-dom';


function CarFinancialForm({ defaultCostInWon = 10000000 }) {
    // User-input states
    const [costInWon, setCostInWon] = useState(defaultCostInWon);
    const [dollarRatePurchaseDay, setDollarRatePurchaseDay] = useState(1300);
    const [freight, setFreight] = useState(500);
    const [expenseBeforeDP, setExpenseBeforeDP] = useState(300);
    const [foreignDollarRate, setForeignDollarRate] = useState(1.1);
    const [soldPrice, setSoldPrice] = useState(25000);
    const [customTax, setCustomTax] = useState(200);
    const [dpExpenseFee, setDpExpenseFee] = useState(100);
    const [extraExpense, setExtraExpense] = useState(50);
    const [clearExpense, setClearExpense] = useState(80);
    const [dollarRateOnSelling, setDollarRateOnSelling] = useState(1320);

    // Derived/calculated states
    const [costInDollars, setCostInDollars] = useState(0);
    const [totalCostInDollars, setTotalCostInDollars] = useState(0);
    const [costInForeign, setCostInForeign] = useState(0);
    const [finalCost, setFinalCost] = useState(0);
    const [soldMinusFinalCost, setSoldMinusFinalCost] = useState(0);
    const [profitInDollars, setProfitInDollars] = useState(0);
    const { carId } = useParams();
    const navigate = useNavigate();

    console.log('🟢 Received carId:', carId); // ✅ Debugging line

    // Check if carId is still undefined
    if (!carId || carId === "undefined") {
        return <h1 className="text-red-600 text-center">Error: Car ID not found!</h1>;
    }

    // Calculate derived fields when inputs change
    useEffect(() => {
        const c = dollarRatePurchaseDay > 0 ? costInWon / dollarRatePurchaseDay : 0; // (C = A/B)
        setCostInDollars(c);

        const f = c + Number(freight) + Number(expenseBeforeDP); // (F = C + D + E)
        setTotalCostInDollars(f);

        const h = f * Number(foreignDollarRate); // (H = F * G)
        setCostInForeign(h);

        const n =
            h +
            Number(customTax) +
            Number(dpExpenseFee) +
            Number(extraExpense) +
            Number(clearExpense); // (N = H + J + K + L + M)
        setFinalCost(n);

        const o = Number(soldPrice) - n; // (O = I - N)
        setSoldMinusFinalCost(o);

        const q = dollarRateOnSelling > 0 ? o / dollarRateOnSelling : 0; // (Q = O / P)
        setProfitInDollars(q);
    }, [
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
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const financialData = {
            carId,
            costInWon: Number(costInWon),
            dollarRatePurchaseDay: Number(dollarRatePurchaseDay),
            freight: Number(freight),
            expenseBeforeDP: Number(expenseBeforeDP),
            foreignDollarRate: Number(foreignDollarRate),
            soldPrice: Number(soldPrice),
            customTax: Number(customTax),
            dpExpenseFee: Number(dpExpenseFee),
            extraExpense: Number(extraExpense),
            clearExpense: Number(clearExpense),
            dollarRateOnSelling: Number(dollarRateOnSelling),
            costInDollars,
            totalCostInDollars,
            costInForeign,
            finalCost,
            soldMinusFinalCost,
            profitInDollars,
        };

        console.log('🔵 Sending Data:', financialData);

        try {
            const response = await api.post('/car-financial-details', financialData);
            console.log('✅ Financial details saved:', response.data);
            // Redirect to the view page after successful save
            navigate(`/view-car/${carId}`);
        } catch (error) {
            console.error('❌ Error saving financial details:', error.response ? error.response.data : error.message);
        }

    };

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Car Financial Details</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Input Fields */}
                    <div>
                        <label className="block mb-1 font-medium">Cost in Won (A)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={costInWon}
                            onChange={(e) => setCostInWon(e.target.value)}
                            placeholder="10000000"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Dollar Rate on Purchase Day (B)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={dollarRatePurchaseDay}
                            onChange={(e) => setDollarRatePurchaseDay(e.target.value)}
                            placeholder="1300"
                            required
                        />
                    </div>
                    {/* Calculated: Cost in Dollars (C = A/B) */}
                    <div>
                        <label className="block mb-1 font-medium">Cost in Dollars (C = A/B)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2 bg-gray-200"
                            value={costInDollars.toFixed(2)}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Freight (D)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={freight}
                            onChange={(e) => setFreight(e.target.value)}
                            placeholder="500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Expense Before DP (E)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={expenseBeforeDP}
                            onChange={(e) => setExpenseBeforeDP(e.target.value)}
                            placeholder="300"
                            required
                        />
                    </div>
                    {/* Calculated: Total Cost in Dollars (F = C+D+E) */}
                    <div>
                        <label className="block mb-1 font-medium">Total Cost in Dollars (F = C+D+E)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2 bg-gray-200"
                            value={totalCostInDollars.toFixed(2)}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Foreign Dollar Rate (G)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={foreignDollarRate}
                            onChange={(e) => setForeignDollarRate(e.target.value)}
                            placeholder="1.1"
                            required
                        />
                    </div>
                    {/* Calculated: Cost in Foreign (H = F x G) */}
                    <div>
                        <label className="block mb-1 font-medium">Cost in Foreign (H = F x G)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2 bg-gray-200"
                            value={costInForeign.toFixed(2)}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Sold Price (I)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={soldPrice}
                            onChange={(e) => setSoldPrice(e.target.value)}
                            placeholder="25000"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Custom Tax (J)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={customTax}
                            onChange={(e) => setCustomTax(e.target.value)}
                            placeholder="200"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">DP Expense Fee (K)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={dpExpenseFee}
                            onChange={(e) => setDpExpenseFee(e.target.value)}
                            placeholder="100"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Extra Expense (L)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={extraExpense}
                            onChange={(e) => setExtraExpense(e.target.value)}
                            placeholder="50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Clear Expense (M)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={clearExpense}
                            onChange={(e) => setClearExpense(e.target.value)}
                            placeholder="80"
                            required
                        />
                    </div>
                    {/* Calculated: Final Cost (N = H+J+K+L+M) */}
                    <div>
                        <label className="block mb-1 font-medium">Final Cost (N = H+J+K+L+M)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2 bg-gray-200"
                            value={finalCost.toFixed(2)}
                            readOnly
                        />
                    </div>
                    {/* Calculated: Sold - Final Cost (O = I - N) */}
                    <div>
                        <label className="block mb-1 font-medium">Sold - Final Cost (O = I - N)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2 bg-gray-200"
                            value={soldMinusFinalCost.toFixed(2)}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Dollar Rate on Selling (P)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={dollarRateOnSelling}
                            onChange={(e) => setDollarRateOnSelling(e.target.value)}
                            placeholder="1320"
                            required
                        />
                    </div>
                    {/* Calculated: Profit in Dollars (Q = O / P) */}
                    <div>
                        <label className="block mb-1 font-medium">Profit in Dollars (Q = O / P)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2 bg-gray-200"
                            value={profitInDollars.toFixed(2)}
                            readOnly
                        />
                    </div>
                </div>
                <button type="submit" className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
                    Save Financial Details
                </button>
            </form>
        </div>
    );
}

export default CarFinancialForm;
