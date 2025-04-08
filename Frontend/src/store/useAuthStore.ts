import { create } from 'zustand';
import { User } from '../types';
import { auth } from '../lib/api';

// Mock user for development testing
const MOCK_USER: User = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'user'
};

// Set to false to use real backend authentication
const USE_MOCK_USER = false;

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Use real authentication
  user: USE_MOCK_USER ? MOCK_USER : null,
  isLoading: false,
  error: null,
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const { user, token } = await auth.login(email, password);
      localStorage.setItem('token', token);
      set({ user, isLoading: false });
    } catch (err) {
      console.error('Login failed:', err);
      set({ error: 'Invalid credentials', isLoading: false });
    }
  },
  register: async (name, email, password) => {
    try {
      set({ isLoading: true, error: null });
      const { user, token } = await auth.register(name, email, password);
      localStorage.setItem('token', token);
      set({ user, isLoading: false });
    } catch (err) {
      console.error('Registration failed:', err);
      set({ error: 'Registration failed', isLoading: false });
    }
  },
  logout: async () => {
    try {
      await auth.logout();
      set({ user: null });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
}));