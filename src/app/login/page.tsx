// src/app/login/page.tsx
"use client";

import { RootState } from "@/store";
import { loadUserAppointments } from "@/store/slices/appointmentsSlice";
import {
  clearError,
  loginFailure,
  loginRequest,
  loginSuccess,
  User,
} from "@/store/slices/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

// Form validation schema
const schema = yup
  .object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

type FormData = {
  email: string;
  password: string;
};

// Define interface for registered user
interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Mock user data (in a real app this would come from an API)
const mockUsers: RegisteredUser[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
  },
];

// Get registered users from localStorage
const getRegisteredUsers = (): RegisteredUser[] => {
  if (typeof window !== "undefined") {
    try {
      const registeredUsers = localStorage.getItem("registeredUsers");
      return registeredUsers ? JSON.parse(registeredUsers) : [];
    } catch (e) {
      console.error("Error getting registered users from localStorage", e);
      return [];
    }
  }
  return [];
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const redirect = searchParams.get("redirect") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Clear any previous errors
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // If user is already authenticated, redirect
    if (isAuthenticated) {
      router.push(redirect);
    }
  }, [isAuthenticated, redirect, router]);

  const onSubmit = (data: FormData) => {
    dispatch(loginRequest());

    // Simulate API call with delay
    setTimeout(() => {
      // Check hardcoded mock users first
      let user = mockUsers.find(
        (u) => u.email === data.email && u.password === data.password
      );

      // If not found in mock users, check registered users
      if (!user) {
        const registeredUsers = getRegisteredUsers();
        user = registeredUsers.find(
          (u: RegisteredUser) =>
            u.email === data.email && u.password === data.password
        );
      }

      if (user) {
        const userData: User = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        dispatch(loginSuccess(userData));
        // Load user-specific appointments
        dispatch(loadUserAppointments());
        router.push(redirect);
      } else {
        dispatch(loginFailure("Invalid email or password"));
      }
    }, 1000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          Sign in
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mb: 3 }}
        >
          Sign in to book appointments with top doctors
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="primary">
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ width: "100%", my: 2 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          For demo: use john@example.com / password123
        </Typography>
      </Paper>
    </Container>
  );
}
