import { create } from 'zustand';
import { reviews } from '../lib/api';
import { Review } from '../types';
import { useAuthStore } from './useAuthStore';

interface ReviewsState {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  fetchReviews: (foodItemId: string) => Promise<void>;
  addReview: (foodItemId: string, content: string, rating: number) => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;
}

export const useReviewsStore = create<ReviewsState>((set) => ({
  reviews: [],
  isLoading: false,
  error: null,
  
  fetchReviews: async (foodItemId: string) => {
    try {
      set({ isLoading: true, error: null });
      const foodReviews = await reviews.getByFoodItem(foodItemId);
      set({ reviews: foodReviews, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      set({ error: 'Failed to fetch reviews', isLoading: false });
    }
  },
  
  addReview: async (foodItemId: string, content: string, rating: number) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: 'User not authenticated' });
      return;
    }
    
    try {
      set({ isLoading: true, error: null });
      await reviews.add(userId, foodItemId, content, rating);
      // Refresh reviews
      const foodReviews = await reviews.getByFoodItem(foodItemId);
      set({ reviews: foodReviews, isLoading: false });
    } catch (error) {
      console.error('Failed to add review:', error);
      set({ error: 'Failed to add review', isLoading: false });
    }
  },
  
  deleteReview: async (reviewId: string) => {
    try {
      set({ isLoading: true, error: null });
      await reviews.delete(reviewId);
      // Update local state by removing the deleted review
      set((state) => ({ 
        reviews: state.reviews.filter(review => review.id !== reviewId),
        isLoading: false 
      }));
    } catch (error) {
      console.error('Failed to delete review:', error);
      set({ error: 'Failed to delete review', isLoading: false });
    }
  },
})); 