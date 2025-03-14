// // src/api.js
// import axios from 'axios';

// const api = axios.create({
//     // Change the base URL here when needed
//     baseURL: 'http://localhost:5000/api'
// });

// export default api;


const api = {
    get: async (url) => {
        console.log(`🚀 Mock API Request: ${url}`);

        if (url === "/cars") {
            return {
                data: [
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
                    {
                        _id: "3",
                        brand: "Toyota",
                        model: "Corolla Cross",
                        year: 2023,
                        price: 36500000,
                        images: [
                            "/images/toyota-corolla-cross-1.jpg",
                            "/images/toyota-corolla-cross-2.jpg",
                        ],
                        transmission: "Automatic",
                        fuelType: "Hybrid",
                        isNew: true,
                    }
                ]
            };
        }

        return { data: {} };
    },
};

export default api;
