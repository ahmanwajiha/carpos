import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListCars() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter state
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [brandFilter, setBrandFilter] = useState('');
    const [transmissionFilter, setTransmissionFilter] = useState('All');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [yearFilter, setYearFilter] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // Fetch car data from the backend

    useEffect(() => {
        setCars([
            {
                _id: "1",
                brand: "SUZUKI",
                model: "Grand Vitara",
                year: 2023,
                price: 43300000,
                images: [
                    "/images/suzuki-vitara-1.jpg",
                    "/images/suzuki-vitara-2.jpg",
                ],
                transmission: "Automatic",
                fuelType: "Hybrid",
                isNew: true,
            },
            {
                _id: "2",
                brand: "BYD",
                model: "Atto 3",
                year: 2023,
                price: 42000000,
                images: [
                    "/images/byd-atto3-1.jpg",
                    "/images/byd-atto3-2.jpg",
                ],
                transmission: "Automatic",
                fuelType: "Electric",
                isNew: true,
            },
        ]);
    }, []);



    // useEffect(() => {
    //     axios.get('http://localhost:5000/api/cars')
    //         .then(response => {
    //             setCars(response.data);
    //             setLoading(false);
    //         })
    //         .catch(err => {
    //             setError('Error fetching car data.');
    //             setLoading(false);
    //         });
    // }, []);

    // Filter cars based on filters
    const filteredCars = cars.filter(car => {
        // Match search text in brand or model
        const matchesSearch =
            (car.brand?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
            (car.model?.toLowerCase() || "").includes(searchText.toLowerCase());


        // Status filter (backend stores status in lowercase)
        const matchesStatus =
            statusFilter === 'All' || car.status === statusFilter.toLowerCase();

        // Brand filter
        const matchesBrand =
            brandFilter === '' || car.brand.toLowerCase().includes(brandFilter.toLowerCase());

        // Transmission filter
        const matchesTransmission =
            transmissionFilter === 'All' || car.transmission === transmissionFilter;

        // Price filter (assume car.price is a number)
        const matchesMinPrice = minPrice === '' || car.price >= parseInt(minPrice);
        const matchesMaxPrice = maxPrice === '' || car.price <= parseInt(maxPrice);

        // Year filter
        const matchesYear = yearFilter === '' || car.year === parseInt(yearFilter);

        return (
            matchesSearch &&
            matchesStatus &&
            matchesBrand &&
            matchesTransmission &&
            matchesMinPrice &&
            matchesMaxPrice &&
            matchesYear
        );
    });

    // Pagination: slice the filtered cars
    const totalPages = Math.ceil(filteredCars.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentCars = filteredCars.slice(startIndex, startIndex + pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="w-full p-6">
            <h1 className="text-3xl font-bold mb-6">List Cars</h1>

            {/* Search and Filter Section */}
            <div className="bg-white p-4 rounded-md shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {/* Search Bar */}
                    <div>
                        <label className="block mb-1 font-medium">Search (Brand/Model)</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search..."
                        />
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block mb-1 font-medium">Status</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="pending">Pending</option>
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>

                    {/* Brand Filter */}
                    <div>
                        <label className="block mb-1 font-medium">Brand</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={brandFilter}
                            onChange={(e) => setBrandFilter(e.target.value)}
                            placeholder="Brand"
                        />
                    </div>

                    {/* Transmission Filter */}
                    <div>
                        <label className="block mb-1 font-medium">Transmission</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={transmissionFilter}
                            onChange={(e) => setTransmissionFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                        <label className="block mb-1 font-medium">Price Range (KRW)</label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                className="w-1/2 border rounded px-3 py-2"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                placeholder="Min"
                            />
                            <input
                                type="number"
                                className="w-1/2 border rounded px-3 py-2"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                placeholder="Max"
                            />
                        </div>
                    </div>

                    {/* Year Filter */}
                    <div>
                        <label className="block mb-1 font-medium">Year</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={yearFilter}
                            onChange={(e) => setYearFilter(e.target.value)}
                            placeholder="Year"
                        />
                    </div>
                </div>
            </div>

            {/* Cars Table */}
            <div className="bg-white p-4 rounded-md shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Make</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Color</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purchase Price (KRW)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentCars.map(car => (
                            <tr key={car._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{car.brand}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{car.model}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{car.exteriorColor}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{car.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link
                                        to={`/admin/view-car/${car._id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center items-center space-x-2">
                <button
                    className="px-3 py-1 border rounded"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                {[...Array(totalPages).keys()].map(page => (
                    <button
                        key={page + 1}
                        className={`px-3 py-1 border rounded ${currentPage === page + 1 ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        {page + 1}
                    </button>
                ))}
                <button
                    className="px-3 py-1 border rounded"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ListCars;
