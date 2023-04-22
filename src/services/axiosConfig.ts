import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5050/api/v1',
  // baseURL: 'https://books-reading-backend.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
