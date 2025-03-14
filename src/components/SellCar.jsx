import { useState } from "react";
import { FaCar, FaCalendarAlt, FaTachometerAlt, FaCogs, FaGasPump, FaCheckCircle, FaUser, FaPhoneAlt } from "react-icons/fa";

const SellCar = () => {
    const [selectedCountry, setSelectedCountry] = useState("+250");

    const countries = [
        { code: "+1", name: "USA" },
        { code: "+44", name: "UK" },
        { code: "+91", name: "India" },
        { code: "+250", name: "Rwanda" },
        { code: "+92", name: "Pakistan" },
    ];

    return (
        <section id="sell-car" className="container mx-auto px-6 py-12">
            {/* Heading */}
            <div className="border-t-4 border-blue-600 w-16 mb-4"></div>
            <h2 className="text-3xl font-bold mb-2">Sell Your Car</h2>
            <p className="text-gray-600 mb-6">Please provide us your car details</p>

            <div className="flex flex-col md:flex-row justify-between items-center">
                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Brand */}
                        <div className="relative">
                            <FaCar className="absolute left-3 top-3 text-gray-500" />
                            <input type="text" placeholder="Select A Brand" className="w-full border rounded-md pl-10 py-2" />
                        </div>

                        {/* Model & Year */}
                        <div className="relative">
                            <FaCar className="absolute left-3 top-3 text-gray-500" />
                            <input type="text" placeholder="Select A Model" className="w-full border rounded-md pl-10 py-2" />
                        </div>
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
                            <select className="w-full border rounded-md pl-10 py-2">
                                <option>Select Year</option>
                                {[...Array(25)].map((_, i) => (
                                    <option key={i}>{2025 - i}</option>
                                ))}
                            </select>
                        </div>

                        {/* Mileage & Transmission */}
                        <div className="relative">
                            <FaTachometerAlt className="absolute left-3 top-3 text-gray-500" />
                            <input type="text" placeholder="Select Mileage Range" className="w-full border rounded-md pl-10 py-2" />
                        </div>
                        <div className="relative">
                            <FaCogs className="absolute left-3 top-3 text-gray-500" />
                            <select className="w-full border rounded-md pl-10 py-2">
                                <option>Transmission Type</option>
                                <option>Automatic</option>
                                <option>Manual</option>
                            </select>
                        </div>

                        {/* Fuel Type & Condition */}
                        <div className="relative">
                            <FaGasPump className="absolute left-3 top-3 text-gray-500" />
                            <select className="w-full border rounded-md pl-10 py-2">
                                <option>Select Fuel Type</option>
                                <option>Carbulant</option>
                                <option>Diesel</option>
                                <option>Electric</option>
                                <option>Hybrid</option>
                                <option>Petrol PHEV</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="relative">
                            <FaCheckCircle className="absolute left-3 top-3 text-gray-500" />
                            <select className="w-full border rounded-md pl-10 py-2">
                                <option>Select A Condition</option>
                                <option>Excellent</option>
                                <option>Good</option>
                                <option>Average</option>
                                <option>Damaged</option>
                            </select>
                        </div>
                    </div>

                    {/* User Details Section */}
                    <p className="text-gray-600 mt-6">Please provide us your details</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3 text-gray-500" />
                            <input type="text" placeholder="Enter Full Name" className="w-full border rounded-md pl-10 py-2" />
                        </div>

                        {/* Phone Number */}
                        <div className="flex border rounded-md">
                            <select className="border-r p-2 bg-gray-100 text-gray-600" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                                {countries.map((country, index) => (
                                    <option key={index} value={country.code}>
                                        {country.code}
                                    </option>
                                ))}
                            </select>
                            <input type="text" placeholder="Phone Number" className="w-full px-3 py-2" />
                        </div>
                    </div>

                    {/* Agreement Text */}
                    <p className="text-gray-500 text-sm mt-2">
                        By clicking Send Button, you agree to our{" "}
                        <a href="#" className="text-blue-600 underline">
                            Terms of Use
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 underline">
                            Privacy Policy
                        </a>
                    </p>

                    {/* Submit Button */}
                    <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 mt-2">
                        SEND
                    </button>
                </div>

                {/* Right Side - Image */}
                <div className="hidden md:block w-1/2">
                    <img src="/images/sellcar.svg" alt="Sell Your Car" className="w-full" />
                </div>
            </div>
        </section>
    );
};

export default SellCar;
