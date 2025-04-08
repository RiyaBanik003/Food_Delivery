import { create } from 'zustand';
import { cart } from '../lib/api';
import { useAuthStore } from './useAuthStore';

export const useCartStore = create((set) => ({
  cartItems: [],
  isLoading: false,
  error: null,
  
  fetchCartItems: async () => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: 'User not authenticated' });
      return;
    }
    
    try {
      set({ isLoading: true, error: null });
      const cartItems = await cart.get(userId);
      set({ cartItems, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
      set({ error: 'Failed to fetch cart items', isLoading: false });
    }
  },
  
  addToCart: async (foodItemId) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: 'User not authenticated' });
      return;
    }
    
    try {
      set({ isLoading: true, error: null });
      // This now uses query params as updated in the API service
      await cart.add(userId, foodItemId);
      // Refresh cart items
      const cartItems = await cart.get(userId);
      set({ cartItems, isLoading: false });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      set({ error: 'Failed to add item to cart', isLoading: false });
    }
  },
  
  removeFromCart: async (foodItemId) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: 'User not authenticated' });
      return;
    }
    
    try {
      set({ isLoading: true, error: null });
      // This now uses query params as updated in the API service
      await cart.remove(userId, foodItemId);
      // Refresh cart items
      const cartItems = await cart.get(userId);
      set({ cartItems, isLoading: false });
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      set({ error: 'Failed to remove item from cart', isLoading: false });
    }
  },
  
  clearCart: async () => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: 'User not authenticated' });
      return;
    }
    
    try {
      set({ isLoading: true, error: null });
      await cart.clear(userId);
      set({ cartItems: [], isLoading: false });
    } catch (error) {
      console.error('Failed to clear cart:', error);
      set({ error: 'Failed to clear cart', isLoading: false });
    }
  },
  
  checkout: async () => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: 'User not authenticated' });
      return null;
    }
    
    try {
      set({ isLoading: true, error: null });
      // This now directly uses the /orders/place/{userId} endpoint
      const order = await cart.checkout(userId);
      set({ cartItems: [], isLoading: false });
      return order.id; // Return the order ID
    } catch (error) {
      console.error('Checkout failed:', error);
      set({ error: 'Checkout failed', isLoading: false });
      return null;
    }
  },
})); 