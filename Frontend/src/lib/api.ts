import axios from 'axios';
import { FoodItem, Category, Address } from '../types';

// Configure the API base URL to point to your backend server
// Change this to your backend URL
// For development, use the localhost URL; for production use relative path
const isDevelopment = import.meta.env.DEV;
const baseURL = isDevelopment 
  ? 'http://localhost:8186/api'  // Updated to match Spring Boot default port
  : '/api';  // Production - change to your deployed backend URL if needed

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Includes cookies in requests
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    // Updated to match AuthController.login
    const response = await api.post('/auth/login', { 
      username: email, // Using email as username
      password 
    });
    return response.data;
  },
  register: async (name: string, email: string, password: string) => {
    // Updated to match AuthController.register
    const response = await api.post('/auth/register', { 
      username: email, // Using email as username
      password,
      name
    });
    return response.data;
  },
  logout: async () => {
    localStorage.removeItem('token');
  },
};

export const users = {
  getUserById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  updateUser: async (id: string, data: Partial<{ name: string; email: string }>) => {
    const response = await api.put(`/users/update/${id}`, data);
    return response.data;
  },
  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/delete/${id}`);
    return response.data;
  },
};

export const food = {
  getAll: async () => {
    // Matches FoodItemController.getAll
    const response = await api.get('/food/all');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/food/${id}`);
    return response.data;
  },
  add: async (foodItem: Omit<FoodItem, 'id'>) => {
    // Matches FoodItemController.addFood
    const response = await api.post('/food/add', foodItem);
    return response.data;
  },
  update: async (id: string, foodItem: Partial<FoodItem>) => {
    const response = await api.put(`/food/update/${id}`, foodItem);
    return response.data;
  },
  delete: async (id: string) => {
    // Matches FoodItemController.deleteFood
    const response = await api.delete(`/food/delete/${id}`);
    return response.data;
  },
};

export const cart = {
  get: async (userId: string) => {
    // Updated to match CartController.getCartItems
    const response = await api.get(`/cart/items/${userId}`);
    return response.data;
  },
  add: async (userId: string, foodItemId: string) => {
    // Updated to match CartController.addToCart which uses query params
    const response = await api.post(`/cart/add?userId=${userId}&foodItemId=${foodItemId}`);
    return response.data;
  },
  remove: async (userId: string, foodItemId: string) => {
    // Updated to match CartController.removeFromCart which uses query params
    const response = await api.post(`/cart/remove?userId=${userId}&foodItemId=${foodItemId}`);
    return response.data;
  },
  clear: async (userId: string) => {
    const response = await api.post(`/cart/clear/${userId}`);
    return response.data;
  },
  checkout: async (userId: string) => {
    // This should be implemented using OrderController.placeOrder
    const response = await api.post(`/orders/place/${userId}`);
    return response.data;
  },
};

export const orders = {
  getAll: async () => {
    // Matches OrderController.getAllOrders
    const response = await api.get('/orders');
    return response.data;
  },
  getById: async (orderId: string) => {
    // Matches OrderController.getOrderById
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },
  getByUser: async (userId: string) => {
    // Matches OrderController.getOrdersByUserId
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
  },
  place: async (userId: string) => {
    // Matches OrderController.placeOrder
    const response = await api.post(`/orders/place/${userId}`);
    return response.data;
  },
  cancel: async (orderId: string) => {
    // Uses OrderController.deleteOrder
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  },
};

// The remaining API sections might need to be updated once their corresponding
// backend controllers are implemented

export const admin = {
  getAllFoodItems: async () => {
    // Can use the standard food controller for now
    const response = await api.get('/food/all');
    return response.data;
  },
  addFoodItem: async (foodItem: Omit<FoodItem, 'id'>) => {
    const response = await api.post('/food/add', foodItem);
    return response.data;
  },
  updateFoodItem: async (id: string, foodItem: Partial<FoodItem>) => {
    const response = await api.put(`/food/update/${id}`, foodItem);
    return response.data;
  },
  deleteFoodItem: async (id: string) => {
    const response = await api.delete(`/food/delete/${id}`);
    return response.data;
  },
  getAllUsers: async () => {
    const response = await api.get('/admin/users/all');
    return response.data;
  },
  deleteUser: async (id: string) => {
    const response = await api.delete(`/admin/user/delete/${id}`);
    return response.data;
  },
};

export const payment = {
  charge: async (orderId: string, paymentDetails: { method: string; cardDetails?: { number: string; expiry: string; cvv: string } }) => {
    const response = await api.post('/payment/charge', { orderId, ...paymentDetails });
    return response.data;
  },
  getStatus: async (orderId: string) => {
    const response = await api.get(`/payment/status/${orderId}`);
    return response.data;
  },
};

export const reviews = {
  getByFoodItem: async (foodItemId: string) => {
    const response = await api.get(`/reviews/${foodItemId}`);
    return response.data;
  },
  add: async (userId: string, foodItemId: string, content: string, rating: number) => {
    const response = await api.post('/reviews/add', { userId, foodItemId, content, rating });
    return response.data;
  },
  delete: async (reviewId: string) => {
    const response = await api.delete(`/reviews/delete/${reviewId}`);
    return response.data;
  },
};

export const categories = {
  getAll: async () => {
    const response = await api.get('/categories/all');
    return response.data;
  },
  add: async (category: Omit<Category, 'id'>) => {
    const response = await api.post('/categories/add', category);
    return response.data;
  },
  update: async (id: string, category: Partial<Category>) => {
    const response = await api.put(`/categories/update/${id}`, category);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/categories/delete/${id}`);
    return response.data;
  },
};

export const address = {
  getByUser: async (userId: string) => {
    const response = await api.get(`/address/${userId}`);
    return response.data;
  },
  add: async (addressData: Omit<Address, 'id'>) => {
    const response = await api.post('/address/add', addressData);
    return response.data;
  },
};

export const notifications = {
  send: async (userId: string, message: string) => {
    const response = await api.post('/notifications/send', { userId, message });
    return response.data;
  },
};

export default api;