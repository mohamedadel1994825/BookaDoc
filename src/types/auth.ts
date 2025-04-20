/**
 * Authentication related types and interfaces
 */

// User interface for authentication
export interface AuthUser {
    id: string;
    name: string;
    email: string;
}

// Stored user in localStorage with credentials
export interface StoredUser {
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
}

// Registration form data
export interface RegisterFormData {
    firstName: string;
    lastName?: string;
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    address?: string;
}

// Login form data
export interface LoginFormData {
    email: string;
    password: string;
}

// Auth state for toast notifications
export interface ToastState {
    open: boolean;
    message: string;
    severity: "success" | "info" | "warning" | "error";
} 