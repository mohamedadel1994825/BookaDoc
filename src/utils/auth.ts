/**
 * Authentication utility functions
 */
import { StoredUser } from '@/types/auth';

/**
 * Normalize email for consistent storage and comparison
 */
export const normalizeEmail = (email: string): string => {
    return email.trim().toLowerCase();
};

/**
 * Check if an email already exists in the system
 */
export const emailExists = (email: string): boolean => {
    const normalizedEmail = normalizeEmail(email);
    const existingEmails = getExistingEmails();
    return existingEmails.includes(normalizedEmail);
};

/**
 * Get all existing emails from various storage locations
 */
export const getExistingEmails = (): string[] => {
    const emails: string[] = [];

    try {
        // Check registered_users in localStorage
        const existingUsers = localStorage.getItem("registered_users");
        if (existingUsers) {
            const users: StoredUser[] = JSON.parse(existingUsers);
            users.forEach((user) => {
                if (user.email && typeof user.email === "string") {
                    emails.push(normalizeEmail(user.email));
                }
            });
        }

        // Check currentUser in localStorage
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            const user = JSON.parse(currentUser);
            if (user.email && typeof user.email === "string") {
                emails.push(normalizeEmail(user.email));
            }
        }

        // Check user in auth state
        const userInAuth = localStorage.getItem("user");
        if (userInAuth) {
            const user = JSON.parse(userInAuth);
            if (user.email && typeof user.email === "string") {
                emails.push(normalizeEmail(user.email));
            }
        }
    } catch (e) {
        console.error("Error reading user data:", e);
    }

    // Remove duplicates
    return [...new Set(emails)];
};

/**
 * Save user to localStorage with proper validation
 */
export const saveUser = (user: StoredUser): { success: boolean; message?: string } => {
    try {
        // Check for existing email
        if (emailExists(user.email)) {
            return { success: false, message: "Email already exists" };
        }

        // Get existing users or initialize empty array
        const existingUsersStr = localStorage.getItem("registered_users");
        const existingUsers: StoredUser[] = existingUsersStr
            ? JSON.parse(existingUsersStr)
            : [];

        // Check for duplicate username
        const normalizedUsername = user.username.toLowerCase();
        const usernameExists = existingUsers.some(
            (u) => u.username && u.username.toLowerCase() === normalizedUsername
        );

        if (usernameExists) {
            return { success: false, message: "Username already exists" };
        }

        // Add new user and save
        existingUsers.push(user);
        localStorage.setItem("registered_users", JSON.stringify(existingUsers));

        return { success: true };
    } catch (e) {
        console.error("Error saving user:", e);
        return { success: false, message: "Storage error" };
    }
}; 