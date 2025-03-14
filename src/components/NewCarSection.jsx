import React from 'react';
import CarCard from './CarCard'; // Import the CarCard component you created

function NewCarsSection() {
    // Temporary sample data for demonstration
    const sampleCars = [
        {
            brand: 'SUZUKI',
            model: 'Grand Vitara',
            year: 2023,
            price: 43300000,
            images: [
                './images/suzuki-vitara-1.jpeg',
                './images/suzuki-vitara-2.jpeg',
            ],
            transmission: 'Automatic',
            fuelType: 'Hybrid',
            isNew: true,
        },
        {
            brand: 'BYD',
            model: 'Atto 3',
            year: 2023,
            price: 42000000,
            images: [
                './images/byd-atto3-1.jpeg',
                './images/byd-atto3-2.jpeg',
            ],
            transmission: 'Automatic',
            fuelType: 'Electric',
            isNew: true,
        },
        {
            brand: 'Leapmotor',
            model: 'T03',
            year: 2024,
            price: 21000000,
            images: [
                './images/leapmotor-t03-1.jpeg',
                './images/leapmotor-t03-2.jpeg',
            ],
            transmission: 'Automatic',
            fuelType: 'Electric',
            isNew: true,
        },
        {
            brand: 'Toyota',
            model: 'Corolla Cross',
            year: 2023,
            price: 36500000,
            images: [
                './images/toyota-corolla-cross-1.jpeg',
                './images/toyota-corolla-cross-2.jpg',
            ],
            transmission: 'Automatic',
            fuelType: 'Hybrid',
            isNew: true,
        },
        {
            brand: 'Honda',
            model: 'Civic RS',
            year: 2023,
            price: 39500000,
            images: [
                './images/honda-civic-rs-1.jpeg',
                './images/honda-civic-rs-2.jpg',
            ],
            transmission: 'Automatic',
            fuelType: 'Petrol',
            isNew: true,
        },
        {
            brand: 'Kia',
            model: 'Sportage',
            year: 2024,
            price: 45000000,
            images: [
                './images/kia-sportage-1.jpeg',
                './images/kia-sportage-2.jpg',
            ],
            transmission: 'Automatic',
            fuelType: 'Hybrid',
            isNew: true,
        },
    ];

    return (
        <div className="container mx-auto py-8 px-4">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    {/* Blue line above the title */}
                    <div className="h-1 w-8 bg-blue-600 mb-2"></div>
                    <h2 className="text-2xl font-bold">New Cars</h2>
                    <p className="text-gray-500">Here you can see different new cars</p>
                </div>

                {/* View All Cars Link */}
                <a href="/cars" className="text-blue-600 hover:underline">
                    View All Cars
                </a>
            </div>

            {/* Car Cards Grid (3 columns on md+) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sampleCars.slice(0, 6).map((car, index) => (
                    <CarCard
                        key={index}
                        brand={car.brand}
                        model={car.model}
                        year={car.year}
                        price={car.price}
                        images={car.images}
                        transmission={car.transmission}
                        fuelType={car.fuelType}
                        isNew={car.isNew}
                    />
                ))}
            </div>

        </div>
    );
}

export default NewCarsSection;
