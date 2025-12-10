import axios from 'axios';

// Apuntamos al puerto 8080 donde Docker expone el Backend
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;