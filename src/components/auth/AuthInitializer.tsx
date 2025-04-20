"use client";

import { login } from "@/store/slices/authSlice";
import { setUserId } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthInitializer() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Check for existing authentication
    const isAuthenticated = document.cookie.includes("auth=true");
    const userStr = localStorage.getItem("currentUser");

    if (isAuthenticated && userStr) {
      try {
        const user = JSON.parse(userStr);

        // Login the user
        dispatch(login(user));

        // Extract user ID - extremely important for cart state
        const userId = user.username || user.userId || user.id;

        // Explicitly set user ID for cart - this must be done AFTER login
        if (userId) {
          console.log("Setting cart user ID:", userId);

          // Small timeout to ensure login has completed
          setTimeout(() => {
            dispatch(setUserId(userId));
          }, 100);
        }
      } catch (error) {
        console.error("Error initializing auth state:", error);
        // Clear invalid auth data
        document.cookie =
          "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        localStorage.removeItem("currentUser");
        router.push("/login");
      }
    }
  }, [dispatch, router]);

  return null;
}
