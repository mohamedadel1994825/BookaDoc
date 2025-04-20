"use client";

import { LoginFormData, loginSchema } from "@/schemas/authSchemas";
import { loadUserAppointments } from "@/store/slices/appointmentsSlice";
import { loginRequest, loginSuccess } from "@/store/slices/authSlice";
import { StoredUser } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
  const [pendingCartItem, setPendingCartItem] = useState<{
    id: number;
    returnTo: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    // Clear any existing auth cookies on the login page load
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    if (searchParams.get("registered") === "true") {
      setShowRegistrationSuccess(true);
    }

    try {
      const storedItem = sessionStorage.getItem("pendingCartItem");
      if (storedItem) {
        setPendingCartItem(JSON.parse(storedItem));
        sessionStorage.removeItem("pendingCartItem");
      }
    } catch (error) {
      console.error("Error reading from sessionStorage:", error);
    }

    // Check if already logged in
    if (document.cookie.includes("auth=true")) {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        const from = searchParams.get("from");
        window.location.href = from || "/"; // Use window.location for hard redirect
      }
    }
  }, [searchParams]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    // Dispatch loginRequest to set loading state
    dispatch(loginRequest());

    try {
      // Check both possible storage keys
      const existingUsers =
        localStorage.getItem("registered_users") ||
        localStorage.getItem("registeredUsers");

      if (!existingUsers) {
        setError("No registered users found. Please register first.");
        setIsLoading(false);
        return;
      }

      const users = JSON.parse(existingUsers) as StoredUser[];

      // Normalize email for case-insensitive comparison
      const normalizedEmail = data.email.trim().toLowerCase();
      const password = data.password.trim();

      // Find user with case-insensitive email comparison and exact password match
      const user = users.find((u: StoredUser) => {
        if (!u.email || typeof u.email !== "string") return false;
        return (
          u.email.toLowerCase() === normalizedEmail && u.password === password
        );
      });

      if (user) {
        // Create proper auth user object with consistent ID
        const authUser = {
          id: user.userId,
          name: `${user.firstName} ${user.lastName || ""}`.trim(),
          email: user.email,
        };

        // Set auth cookie with a longer expiration time
        document.cookie = "auth=true; path=/; max-age=86400"; // 24 hours

        // Save user with the EXACT SAME FORMAT to both storage locations to ensure consistent IDs
        localStorage.setItem("user", JSON.stringify(authUser));
        localStorage.setItem("currentUser", JSON.stringify(user));

        // First trigger login success
        dispatch(loginSuccess(authUser));

        // Then load appointments with slight delay to ensure user ID is available
        setTimeout(() => {
          dispatch(loadUserAppointments());
        }, 100);

        // Get the redirect path from the URL or use default
        const searchParams = new URLSearchParams(window.location.search);
        const redirectTo =
          searchParams.get("from") || searchParams.get("redirect") || "/";

        // Keep loading state active during the redirect
        // Use router for SPA navigation instead of window.location for better user experience
        setTimeout(() => {
          router.push(redirectTo);
        }, 500);
      } else {
        // Only set loading to false on error/failure
        setError("Invalid email or password");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        width: "100%",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>

      {showRegistrationSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Registration successful! Please log in.
        </Alert>
      )}

      {pendingCartItem && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Please log in to add items to your cart.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mb: 2 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : "Login"}
      </Button>

      <Button variant="text" fullWidth onClick={() => router.push("/register")}>
        Don&apos;t have an account? Register
      </Button>
    </Box>
  );
}
