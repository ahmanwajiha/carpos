import { FaChevronLeft, FaChevronRight, FaCogs, FaGasPump } from "react-icons/fa";
import { useState } from "react";

const CarCard = ({ brand, model, year, price, images, transmission, fuelType, isNew }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const hasImages = images && images.length > 0;
    const currentImageUrl = hasImages ? images[currentImageIndex] : "/images/default-car.jpg";

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="bg-white rounded-md shadow-md p-4 relative max-w-sm">
            {/* Image Container with "NEW" Badge on Top */}
            <div className="relative w-full h-48 mb-4">
                {/* "NEW" Badge (Now properly above the image) */}
                {isNew && (
                    <span className="absolute top-2 left-2 z-10 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        NEW
                    </span>
                )}

                {/* Car Image */}
                <img
                    src={currentImageUrl}
                    alt={`${brand} ${model}`}
                    className="w-full h-full object-cover rounded-md"
                />

                {/* Arrows for multiple images */}
                {hasImages && images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-1 rounded-full z-10"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-1 rounded-full z-10"
                        >
                            <FaChevronRight />
                        </button>
                    </>
                )}
            </div>

            {/* Car Info */}
            <h3 className="text-lg font-semibold mb-1">
                {brand} {model} {year}
            </h3>

            {/* Price */}
            <p className="text-blue-600 text-xl font-bold mb-2">
                {price.toLocaleString()} KRW
            </p>

            {/* Transmission & Fuel Icons */}
            <div className="flex items-center space-x-4 text-gray-700">
                {/* Transmission */}
                <div className="flex items-center space-x-1">
                    <FaCogs />
                    <span>{transmission}</span>
                </div>

                {/* Fuel Type */}
                <div className="flex items-center space-x-1">
                    <FaGasPump />
                    <span>{fuelType}</span>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
