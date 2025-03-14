import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa';
import api from '../api';

function ViewCarDetails() {
    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const [financial, setFinancial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Fetch car overview and financial details
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(`Fetching data for carId: ${carId}`);

                const res = await api.get(`/car-financial-details/${carId}`);

                if (res.data.car) {
                    setCar(res.data.car);
                    console.log('✅ Car data loaded:', res.data.car);
                }

                if (res.data.financial) {
                    setFinancial(res.data.financial);
                    console.log('✅ Financial details loaded:', res.data.financial);
                } else {
                    console.warn('⚠️ No financial details found.');
                }

                setLoading(false); // Mark as loaded
            } catch (error) {
                console.error('❌ Error fetching car details:', error.response ? error.response.data : error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [carId]);

    // Image navigation handlers
    const handlePrevImage = () => {
        setCurrentImageIndex((prev) =>
            prev > 0 ? prev - 1 : (car.images.length - 1)
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) =>
            prev < car.images.length - 1 ? prev + 1 : 0
        );
    };

    if (!car) {
        return <div className="p-6">Loading car details...</div>;
    }


    // If no car data is found, display an error message
    if (!car) {
        return <div className="p-6 text-red-500">❌ Car details not found!</div>;
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6 space-y-8">
            {/* Section 1: Photo Gallery */}
            <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
                <div className="relative">
                    {car.images && car.images.length > 0 ? (
                        <>
                            <img
                                src={car.images[currentImageIndex]}
                                alt={`Car ${currentImageIndex + 1}`}
                                className="w-full h-96 object-cover rounded-md"
                            />
                            <button
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
                                onClick={handlePrevImage}
                            >
                                <FaArrowLeft />
                            </button>
                            <button
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
                                onClick={handleNextImage}
                            >
                                <FaArrowRight />
                            </button>
                            {/* Thumbnails */}
                            <div className="mt-4 flex justify-center space-x-2">
                                {car.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${idx === currentImageIndex ? 'border-blue-600' : 'border-transparent'}`}
                                        onClick={() => setCurrentImageIndex(idx)}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-96 flex flex-col items-center justify-center border-dashed border-4 border-gray-400 rounded-md cursor-pointer">
                            <FaPlus className="text-4xl text-gray-400" />
                            <span className="mt-2 text-gray-500">No images. Click to upload.</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Section 2: Overview */}
            <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div><span className="font-medium">Brand:</span> {car.brand}</div>
                    <div><span className="font-medium">Model:</span> {car.model}</div>
                    <div><span className="font-medium">Year:</span> {car.year}</div>
                    <div><span className="font-medium">Fuel Type:</span> {car.fuelType}</div>
                    <div><span className="font-medium">Transmission:</span> {car.transmission}</div>
                    <div><span className="font-medium">Mileage:</span> {car.mileageRange}</div>
                    <div><span className="font-medium">Price (KRW):</span> {car.price.toLocaleString()}</div>
                </div>
            </div>

            {/* Section 3: Specifications */}
            <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div><span className="font-medium">Body Type:</span> {car.bodyType}</div>
                    <div><span className="font-medium">Number of Keys:</span> {car.numberOfKeys}</div>
                    <div><span className="font-medium">Exterior Color:</span> {car.exteriorColor}</div>
                    <div><span className="font-medium">Interior Color:</span> {car.interiorColor}</div>
                    <div><span className="font-medium">Number of Owners:</span> {car.numberOfOwners}</div>
                    <div><span className="font-medium">Condition:</span> {car.condition}</div>
                    <div><span className="font-medium">Seats:</span> {car.seats}</div>
                    <div><span className="font-medium">Autonomy:</span> {car.autonomy}</div>
                </div>
            </div>

            {/* Section 4: Financial Overview */}
            <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">Financial Overview</h2>
                {financial ? (
                    <div className="grid grid-cols-2 gap-4">
                        <div><span className="font-medium">Cost in Won (A):</span> {financial.costInWon}</div>
                        <div><span className="font-medium">Dollar Rate (Purchase Day) (B):</span> {financial.dollarRatePurchaseDay}</div>
                        <div><span className="font-medium">Cost in Dollars (C):</span> {financial.costInDollars.toFixed(2)}</div>
                        <div><span className="font-medium">Freight (D):</span> {financial.freight}</div>
                        <div><span className="font-medium">Expense Before DP (E):</span> {financial.expenseBeforeDP}</div>
                        <div><span className="font-medium">Total Cost in Dollars (F):</span> {financial.totalCostInDollars.toFixed(2)}</div>
                        <div><span className="font-medium">Foreign Dollar Rate (G):</span> {financial.foreignDollarRate}</div>
                        <div><span className="font-medium">Cost in Foreign (H):</span> {financial.costInForeign.toFixed(2)}</div>
                        <div><span className="font-medium">Sold Price (I):</span> {financial.soldPrice}</div>
                        <div><span className="font-medium">Custom Tax (J):</span> {financial.customTax}</div>
                        <div><span className="font-medium">DP Expense Fee (K):</span> {financial.dpExpenseFee}</div>
                        <div><span className="font-medium">Extra Expense (L):</span> {financial.extraExpense}</div>
                        <div><span className="font-medium">Clear Expense (M):</span> {financial.clearExpense}</div>
                        <div><span className="font-medium">Final Cost (N):</span> {financial.finalCost.toFixed(2)}</div>
                        <div><span className="font-medium">Sold Minus Final Cost (O):</span> {financial.soldMinusFinalCost.toFixed(2)}</div>
                        <div><span className="font-medium">Dollar Rate (on Selling) (P):</span> {financial.dollarRateOnSelling}</div>
                        <div><span className="font-medium">Profit in Dollars (Q):</span> {financial.profitInDollars.toFixed(2)}</div>
                    </div>
                ) : (
                    <p className="text-gray-600">Financial details not available.</p>
                )}
            </div>
        </div>
    );
}

export default ViewCarDetails;
