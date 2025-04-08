import { create } from 'zustand';
import { orders, payment } from '../lib/api';
import { useAuthStore } from './useAuthStore';

export const useOrdersStore = create((set) => ({
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
  
  fetchOrders: async () => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: 'User not authenticated' });
      return;
    }
    
    try {
      set({ isLoading: true, error: null });
      // Updated to use the /orders/user/{userId} endpoint
      const userOrders = await orders.getByUser(userId);
      set({ orders: userOrders, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      set({ error: 'Failed to fetch orders', isLoading: false });
    }
  },
  
  fetchOrderById: async (orderId) => {
    try {
      set({ isLoading: true, error: null });
      // Updated to use the /orders/{id} endpoint
      const orderDetails = await orders.getById(orderId);
      set({ currentOrder: orderDetails, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      set({ error: 'Failed to fetch order details', isLoading: false });
    }
  },
  
  placeOrder: async () => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: 'User not authenticated' });
      return null;
    }
    
    try {
      set({ isLoading: true, error: null });
      // Updated to use the /orders/place/{userId} endpoint
      const order = await orders.place(userId);
      // Refresh orders
      const userOrders = await orders.getByUser(userId);
      set({ orders: userOrders, isLoading: false });
      return order.id;
    } catch (error) {
      console.error('Failed to place order:', error);
      set({ error: 'Failed to place order', isLoading: false });
      return null;
    }
  },
  
  cancelOrder: async (orderId) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: 'User not authenticated' });
      return;
    }
    
    try {
      set({ isLoading: true, error: null });
      // Updated to use the /orders/{id} endpoint with DELETE method
      await orders.cancel(orderId);
      // Refresh orders
      const userOrders = await orders.getByUser(userId);
      set({ orders: userOrders, isLoading: false });
    } catch (error) {
      console.error('Failed to cancel order:', error);
      set({ error: 'Failed to cancel order', isLoading: false });
    }
  },
  
  processPayment: async (orderId, paymentDetails) => {
    try {
      set({ isLoading: true, error: null });
      await payment.charge(orderId, paymentDetails);
      set({ isLoading: false });
      return true;
    } catch (error) {
      console.error('Payment failed:', error);
      set({ error: 'Payment failed', isLoading: false });
      return false;
    }
  },
})); 