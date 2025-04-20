"use client";

import { loginSchema } from "@/schemas/authSchemas";
import { login } from "@/store/slices/authSlice";
import { setUserId } from "@/store/slices/cartSlice";
import { User } from "@/types/user";
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

type FormData = {
  email: string;
  password: string;
};

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
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
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

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      const existingUsers = localStorage.getItem("registered_users");
      const users: User[] = existingUsers ? JSON.parse(existingUsers) : [];
      const email = data.email.trim().toLowerCase();
      const password = data.password.trim();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Set auth cookie with a longer expiration time
        document.cookie = "auth=true; path=/; max-age=86400"; // 24 hours
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Dispatch login action
        dispatch(login(user));
        dispatch(setUserId(user.username));

        // Use window.location for a hard redirect instead of router.push
        const redirectTo = pendingCartItem
          ? `/product/${pendingCartItem.id}`
          : searchParams.get("from") || "/";

        window.location.href = redirectTo;
      } else {
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
