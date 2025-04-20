import { getCartKey, saveCart } from '@/helpers/cart';
import { api } from '@/services/api';
import { Product } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a function to get the current user ID from localStorage or cookies
// Fixed getCurrentUserId function from cartSlice.ts
export const getCurrentUserId = (): string => {
  if (typeof window !== 'undefined') {
    // Try to get userId from localStorage or cookie
    try {
      // Check for user in localStorage
      const user = localStorage.getItem('currentUser');
      if (user) {
        const userData = JSON.parse(user);
        // If userData is already a string, return it directly
        if (typeof userData === 'string') {
          return userData;
        }
        // Otherwise, check for different possible structures
        if (userData.id) {
          return userData.id.toString();
        } else if (userData.userId) {
          return userData.userId.toString();
        } else if (userData.username) {
          return userData.username;
        }
      }

      // Or check auth cookie as fallback
      const cookies = document.cookie.split(';');
      const authCookie = cookies.find(cookie => cookie.trim().startsWith('userId='));
      if (authCookie) {
        return authCookie.split('=')[1];
      }

      // Another approach - check if we have an auth cookie
      const hasAuthCookie = cookies.some(cookie => cookie.trim().startsWith('auth='));
      if (hasAuthCookie) {
        // Try to get the user from users in localStorage
        const usersStr = localStorage.getItem('users');
        if (usersStr) {
          const users = JSON.parse(usersStr);
          // Return the first user's id as a fallback
          // This is just a guess - you should adjust this based on your actual auth system
          if (users && users.length > 0 && users[0].id) {
            return users[0].id.toString();
          }
        }
      }
    } catch (error) {
      console.error('Error getting current user ID:', error);
    }
  }
  return '';
};

// Updated loadInitialState to work with or without userId
const loadInitialState = (): CartState => {
  if (typeof window !== 'undefined') {
    try {
      const userId = getCurrentUserId();

      if (userId) {
        const savedCart = localStorage.getItem(getCartKey(userId));
        if (savedCart) {
          return { items: JSON.parse(savedCart), userId };
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  // Return default state with the current userId if available
  return { items: [], userId: getCurrentUserId() };
};

interface CartState {
  items: Product[];
  userId: string;
}

// Initialize with an attempt to load state from storage
const initialState: CartState = loadInitialState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCart(state.userId, state.items);
    },

    // Remove item from cart
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCart(state.userId, state.items);
    },

    // Update item quantity
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        saveCart(state.userId, state.items);
      }
    },

    // Reorder items in cart
    reorderItems: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      saveCart(state.userId, state.items);
    },

    // Clear all items from cart
    // Clear all items from cart
    clearCart: (state) => {
      state.items = [];

      // IMPORTANT: Do NOT remove from localStorage when clearing cart during logout
      // This allows each user's cart to persist between sessions
      // localStorage.removeItem(getCartKey(state.userId));
    },


    // Set userId and load cart state for that user
    // Modified setUserId reducer for cartSlice.ts
    setUserId: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        // First clear the current cart to avoid mixing items
        state.items = [];

        // Set the new userId
        state.userId = action.payload;

        // Then load the cart for the new user
        if (typeof window !== 'undefined') {
          try {
            const cartKey = getCartKey(action.payload);
            const savedCart = localStorage.getItem(cartKey);
            if (savedCart) {
              state.items = JSON.parse(savedCart);
            } else {
              // Initialize with empty cart if none exists
              state.items = [];
              saveCart(action.payload, []);
            }
          } catch (error) {
            console.error(`Error loading cart for ${action.payload}:`, error);
            state.items = [];
          }
        }
      }
    },

    // Initialize cart on app start
    initializeCart: (state) => {
      const userId = getCurrentUserId();
      if (userId && userId !== state.userId) {
        state.userId = userId;
        try {
          const savedCart = localStorage.getItem(getCartKey(userId));
          if (savedCart) {
            state.items = JSON.parse(savedCart);
          }
        } catch (error) {
          console.error(`Error initializing cart for ${userId}:`, error);
        }
      }
    }
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  reorderItems,
  clearCart,
  setUserId,
  initializeCart
} = cartSlice.actions;

export default cartSlice.reducer;

// Cart API for network interactions
export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: (product) => ({
        url: '/cart',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Cart'],
    }),
    updateCartItem: builder.mutation({
      query: ({ id, ...item }) => ({
        url: `/cart/${id}`,
        method: 'PUT',
        body: item,
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: '/cart/clear',
        method: 'POST',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;