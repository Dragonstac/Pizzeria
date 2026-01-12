import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token or other headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Pizza API
export const pizzaAPI = {
  getAll: async () => {
    const response = await apiClient.get(API_ENDPOINTS.PIZZAS);
    return response.data;
  },
  seed: async () => {
    const response = await apiClient.get(`${API_ENDPOINTS.PIZZAS}/seed`);
    return response.data;
  },
};

// Ingredient API
export const ingredientAPI = {
  getAll: async () => {
    const response = await apiClient.get(API_ENDPOINTS.INGREDIENTS);
    return response.data;
  },
  seed: async () => {
    const response = await apiClient.get(`${API_ENDPOINTS.INGREDIENTS}/seed`);
    return response.data;
  },
};

// Cart API
export const cartAPI = {
  getAll: async () => {
    const response = await apiClient.get(API_ENDPOINTS.CART);
    return response.data;
  },
  add: async (item) => {
    const response = await apiClient.post(API_ENDPOINTS.CART, item);
    return response.data;
  },
  update: async (id, updates) => {
    const response = await apiClient.put(`${API_ENDPOINTS.CART}/${id}`, updates);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`${API_ENDPOINTS.CART}/${id}`);
    return response.data;
  },
};

export default apiClient;
