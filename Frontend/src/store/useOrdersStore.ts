import { create } from 'zustand';
import { orders, payment } from '../lib/api';
import { Order } from '../types';
import { useAuthStore } from './useAuthStore';

interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (orderId: string) => Promise<void>;
  placeOrder: () => Promise<string | null>; // returns orderId on success
  cancelOrder: (orderId: string) => Promise<void>;
  processPayment: (
    orderId: string, 
    paymentDetails: { 
      method: string; 
      cardDetails?: { 
        number: string; 
        expiry: string; 
        cvv: string 
      }
    }
  ) => Promise<boolean>;
}

export const useOrdersStore = create<OrdersState>((set) => ({
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
      const userOrders = await orders.getByUser(userId);
      set({ orders: userOrders, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      set({ error: 'Failed to fetch orders', isLoading: false });
    }
  },
  
  fetchOrderById: async (orderId: string) => {
    try {
      set({ isLoading: true, error: null });
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
      const order = await orders.place(userId);
      const userOrders = await orders.getByUser(userId);
      set({ orders: userOrders, isLoading: false });
      return order.id;
    } catch (error) {
      console.error('Failed to place order:', error);
      set({ error: 'Failed to place order', isLoading: false });
      return null;
    }
  },
  
  cancelOrder: async (orderId: string) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: 'User not authenticated' });
      return;
    }
    
    try {
      set({ isLoading: true, error: null });
      await orders.cancel(orderId);
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