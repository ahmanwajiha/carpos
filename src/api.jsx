// src/api.js
import axios from 'axios';

const api = axios.create({
    // Change the base URL here when needed
    baseURL: 'http://localhost:5000/api'
});

export default api;
