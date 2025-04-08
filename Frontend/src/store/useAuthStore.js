import { create } from 'zustand';
import { auth } from '../lib/api';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const response = await auth.login(email, password);
      if (response === 'Login successful') {
        // In a real app, you would get the user data from the response
        // For now, we'll create a mock user
        const user = {
          id: '1', // This would come from the backend
          name: email.split('@')[0], // Using email prefix as name
          email: email,
          role: 'user'
        };
        set({ user, isLoading: false });
        return true;
      } else {
        set({ error: 'Invalid credentials', isLoading: false });
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      set({ error: 'Login failed', isLoading: false });
      return false;
    }
  },
  
  register: async (name, email, password) => {
    try {
      set({ isLoading: true, error: null });
      const user = await auth.register(name, email, password);
      set({ user, isLoading: false });
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      set({ error: 'Registration failed', isLoading: false });
      return false;
    }
  },
  
  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await auth.logout();
      set({ user: null, isLoading: false });
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      set({ error: 'Logout failed', isLoading: false });
      return false;
    }
  },
  
  clearError: () => {
    set({ error: null });
  }
})); 