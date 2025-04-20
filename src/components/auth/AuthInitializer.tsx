"use client";

import { logout } from "@/store/slices/authSlice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

/**
 * Component for handling authentication initialization and cleanup
 * Ensures auth state is properly synchronized
 */
export default function AuthInitializer() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    // Clear auth state for login/register pages
    if (pathname === "/login" || pathname === "/register") {
      // Remove auth cookie to ensure fresh login
      document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      // Clear any stale auth data in Redux
      dispatch(logout());

      // Clear localStorage auth data
      localStorage.removeItem("user");
    }
  }, [pathname, dispatch]);

  // This is a utility component that doesn't render anything
  return null;
}
