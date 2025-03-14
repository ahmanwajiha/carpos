import React, { useState } from "react";
import api from "../api";
import { useNavigate } from 'react-router-dom';


function AddCar() {
    // Car Overview State
    const navigate = useNavigate();

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [mileageRange, setMileageRange] = useState("");
    const [price, setPrice] = useState("");
    const [transmission, setTransmission] = useState("Automatic");
    const [fuelType, setFuelType] = useState("Carbulant");
    const [autonomy, setAutonomy] = useState("");
    const [seats, setSeats] = useState("");

    // Car Specifications State
    const [bodyType, setBodyType] = useState("Sedan");
    const [numberOfKeys, setNumberOfKeys] = useState("");
    const [exteriorColor, setExteriorColor] = useState("");
    const [interiorColor, setInteriorColor] = useState("");
    const [numberOfOwners, setNumberOfOwners] = useState("");
    const [condition, setCondition] = useState("Excellent");

    // Image Upload State
    const [images, setImages] = useState([]);

    // Handle Image Upload
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);
    };

    // Handle Remove Image
    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCar = {
            brand,
            model,
            year,
            mileageRange,
            price,
            transmission,
            fuelType,
            autonomy,
            seats,
            bodyType,
            numberOfKeys,
            exteriorColor,
            interiorColor,
            numberOfOwners,
            condition,
            images,
        };
        try {
            const response = await api.post('/cars', newCar);
            console.log('✅ Car added successfully:', response.data);

            if (response.data && response.data.car && response.data.car._id) {
                console.log('🔵 Redirecting with Car ID:', response.data.car._id);
                navigate(`/add-financial-details/${response.data.car._id}`);
            } else {
                console.error('❌ Car ID not returned from API');
            }
        } catch (err) {
            console.error('❌ Error adding car:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Add a New Car</h1>

            {/* Image Upload Section */}
            <div className="bg-white p-6 rounded-md shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Upload Pictures</h2>
                <div className="flex flex-col items-center space-y-4">
                    <label className="cursor-pointer flex flex-col items-center border-2 border-dashed border-gray-400 p-6 rounded-md w-64">
                        <span className="text-gray-600">Click to add pictures</span>
                        <input type="file" multiple className="hidden" onChange={handleImageChange} />
                    </label>

                    {/* Display Uploaded Images */}
                    {images.length > 0 && (
                        <div className="flex flex-wrap gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} className="w-24 h-24 object-cover rounded-md" />
                                    <button onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Car Details Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
                {/* Car Overview Section */}
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Car Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Brand</label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Toyota" required />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Model</label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Corolla" required />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Year</label>
                        <input type="number" className="w-full border rounded px-3 py-2" value={year} onChange={(e) => setYear(e.target.value)} placeholder="2022" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Mileage Range (km)</label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={mileageRange} onChange={(e) => setMileageRange(e.target.value)} placeholder="10,000 - 20,000 km" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Transmission Type</label>
                        <select className="w-full border rounded px-3 py-2" value={transmission} onChange={(e) => setTransmission(e.target.value)}>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Fuel Type</label>
                        <select className="w-full border rounded px-3 py-2" value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
                            <option value="Carbulant">Carbulant</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Petrol PHEV">Petrol PHEV</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Autonomy (km)</label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={autonomy} onChange={(e) => setAutonomy(e.target.value)} placeholder="500 km" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Seats</label>
                        <input type="number" className="w-full border rounded px-3 py-2" value={seats} onChange={(e) => setSeats(e.target.value)} placeholder="5" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Price (KRW)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="10000000"
                        />
                    </div>



                </div>

                {/* Specifications Section */}
                <h2 className="text-xl font-semibold mt-6 mb-4 border-b pb-2">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Body Type</label>
                        <select className="w-full border rounded px-3 py-2" value={bodyType} onChange={(e) => setBodyType(e.target.value)}>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Hatchback">Hatchback</option>
                            <option value="Truck">Truck</option>
                            <option value="Coupe">Coupe</option>
                            <option value="Convertible">Convertible</option>
                            <option value="Van">Van</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Number of Keys</label>
                        <input type="number" className="w-full border rounded px-3 py-2" value={numberOfKeys} onChange={(e) => setNumberOfKeys(e.target.value)} placeholder="2" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Exterior Color</label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={exteriorColor} onChange={(e) => setExteriorColor(e.target.value)} placeholder="Black" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Interior Color</label>
                        <input type="text" className="w-full border rounded px-3 py-2" value={interiorColor} onChange={(e) => setInteriorColor(e.target.value)} placeholder="Beige" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Number of Owners</label>
                        <input type="number" className="w-full border rounded px-3 py-2" value={numberOfOwners} onChange={(e) => setNumberOfOwners(e.target.value)} placeholder="1" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Condition</label>
                        <select className="w-full border rounded px-3 py-2" value={condition} onChange={(e) => setCondition(e.target.value)}>
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Average">Average</option>
                            <option value="Damaged">Damaged</option>
                        </select>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
                    Save Car
                </button>
            </form>
        </div>
    );
}

export default AddCar;
