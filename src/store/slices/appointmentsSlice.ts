import { Appointment } from '@/helpers/mockData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppointmentsState {
    appointments: Appointment[];
}

// Get current user ID from localStorage
const getCurrentUserId = (): string | null => {
    if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const user = JSON.parse(savedUser);
                return user.id;
            } catch (e) {
                return null;
            }
        }
    }
    return null;
};

// Get appointment storage key for current user
const getAppointmentsKey = (): string => {
    const userId = getCurrentUserId();
    return userId ? `appointments_${userId}` : 'appointments';
};

// Load initial appointments from localStorage if available
const getInitialState = (): AppointmentsState => {
    if (typeof window !== 'undefined') {
        const storageKey = getAppointmentsKey();
        const savedAppointments = localStorage.getItem(storageKey);
        if (savedAppointments) {
            try {
                const appointments = JSON.parse(savedAppointments);
                return {
                    appointments
                };
            } catch (e) {
                localStorage.removeItem(storageKey);
            }
        }
    }

    return {
        appointments: [],
    };
};

export const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: getInitialState(),
    reducers: {
        addAppointment: (state, action: PayloadAction<Appointment>) => {
            state.appointments.push(action.payload);

            // Save to localStorage
            if (typeof window !== 'undefined') {
                const storageKey = getAppointmentsKey();
                localStorage.setItem(storageKey, JSON.stringify(state.appointments));
            }
        },
        removeAppointment: (state, action: PayloadAction<string>) => {
            state.appointments = state.appointments.filter(
                (appointment) => appointment.id !== action.payload
            );

            // Save to localStorage
            if (typeof window !== 'undefined') {
                const storageKey = getAppointmentsKey();
                localStorage.setItem(storageKey, JSON.stringify(state.appointments));
            }
        },
        // This will be triggered when a user logs in or out
        loadUserAppointments: (state) => {
            // Re-initialize the state with the logged-in user's appointments
            const newState = getInitialState();
            state.appointments = newState.appointments;
        }
    },
});

export const { addAppointment, removeAppointment, loadUserAppointments } = appointmentsSlice.actions;
export default appointmentsSlice.reducer; 