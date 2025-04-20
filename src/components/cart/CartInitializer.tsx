"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCart } from '@/store/slices/cartSlice';
import { RootState } from '@/store';

export default function CartInitializer() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userId = useSelector((state: RootState) => state.auth.user?.username || '');
  
  // This will run on page refresh or direct navigation
  // AuthInitializer handles login/logout transitions
  useEffect(() => {
    if (isAuthenticated && userId) {
      // Use a slight delay to ensure AuthInitializer has completed
      const timer = setTimeout(() => {
        dispatch(initializeCart());
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);  // Only run on component mount

  return null;
}