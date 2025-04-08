import { create } from 'zustand';
import { food, categories as categoriesApi } from '../lib/api';
import { FoodItem, Category } from '../types';

interface FoodState {
  foodItems: FoodItem[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string | null;
  fetchFoodItems: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSelectedCategory: (category: string | null) => void;
}

export const useFoodStore = create<FoodState>((set) => ({
  foodItems: [],
  categories: [],
  isLoading: false,
  error: null,
  selectedCategory: null,
  
  fetchFoodItems: async () => {
    try {
      set({ isLoading: true, error: null });
      const foodItems = await food.getAll();
      set({ foodItems, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch food items:', error);
      set({ error: 'Failed to fetch food items', isLoading: false, foodItems: [] });
    }
  },
  
  fetchCategories: async () => {
    try {
      set({ isLoading: true, error: null });
      const categories = await categoriesApi.getAll();
      set({ categories, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      set({ error: 'Failed to fetch categories', isLoading: false, categories: [] });
    }
  },
  
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },
})); 