import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-base-url.com', // Replace with actual base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or get from Redux/Context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access globally
      window.location.href = '/login'; // or dispatch logout action
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
