/**
 * Custom hook for authentication-related functionality
 */
import { loadUserAppointments } from '@/store/slices/appointmentsSlice';
import { AuthUser, LoginFormData, RegisterFormData, StoredUser, ToastState } from '@/types/auth';
import { normalizeEmail, saveUser } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export function useAuth() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<ToastState>({
        open: false,
        message: '',
        severity: 'info'
    });

    // Clear any error when component mounts
    useEffect(() => {
        setError(null);
    }, []);

    const handleCloseToast = () => {
        setToast({ ...toast, open: false });
    };

    /**
     * Handle user registration
     */
    const register = async (formData: RegisterFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const normalizedEmail = normalizeEmail(formData.email);

            // Create new user object
            const newUser: StoredUser = {
                userId: `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
                firstName: formData.firstName,
                lastName: formData.lastName || '',
                username: formData.username,
                password: formData.password,
                email: normalizedEmail,
            };

            // Save user to localStorage with validation
            const result = saveUser(newUser);

            if (result.success) {
                setToast({
                    open: true,
                    message: 'Registration successful! Redirecting to login...',
                    severity: 'success',
                });

                // Set registration flag for AuthInitializer
                sessionStorage.setItem('justRegistered', 'true');

                // Redirect after a short delay to show success message
                setTimeout(() => {
                    router.push('/login?registered=true');
                }, 1500);
            } else {
                setError(result.message || 'Registration failed. Please try again.');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Registration failed. Please try again.');
            setIsLoading(false);
        }
    };

    /**
     * Handle user login
     */
    const login = async (data: LoginFormData, redirectPath?: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const normalizedEmail = normalizeEmail(data.email);
            const password = data.password.trim();

            // Get registered users
            const existingUsersStr = localStorage.getItem('registered_users');
            const existingUsers: StoredUser[] = existingUsersStr
                ? JSON.parse(existingUsersStr)
                : [];

            // Find matching user
            const user = existingUsers.find(
                (u) => normalizeEmail(u.email) === normalizedEmail && u.password === password
            );

            if (user) {
                // Create auth user object
                const authUser: AuthUser = {
                    id: user.userId,
                    name: `${user.firstName} ${user.lastName}`.trim(),
                    email: user.email,
                };

                // Save auth user to localStorage
                localStorage.setItem('user', JSON.stringify(authUser));

                // Set auth cookie for session
                document.cookie = 'auth=true; path=/; max-age=86400'; // 24 hours

                // Load user appointments
                dispatch(loadUserAppointments());

                // Redirect to specified path or home
                router.push(redirectPath || '/');
            } else {
                setError('Invalid email or password');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    /**
     * Handle user logout
     */
    const logout = () => {
        localStorage.removeItem('user');
        document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push('/login');
    };

    return {
        isLoading,
        error,
        toast,
        handleCloseToast,
        register,
        login,
        logout
    };
} 