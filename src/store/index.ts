import appointmentsReducer from '@/store/slices/appointmentsSlice';
import authReducer from '@/store/slices/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        appointments: appointmentsReducer,
        auth: authReducer,
    },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 