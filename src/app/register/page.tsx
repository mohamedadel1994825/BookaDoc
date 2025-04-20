"use client";

import { RootState } from "@/store";
import { loadUserAppointments } from "@/store/slices/appointmentsSlice";
import {
  clearError,
  registerFailure,
  registerRequest,
  registerSuccess,
  User,
} from "@/store/slices/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

// Form validation schema
const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  })
  .required();

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Define local user interface for registration
interface RegisterUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Save registered user to localStorage
const saveRegisteredUser = (
  userData: RegisterUser
): { success: boolean; message?: string } => {
  if (typeof window !== "undefined") {
    try {
      // Get existing registered users or initialize empty array
      const existingUsers = localStorage.getItem("registeredUsers");
      const registeredUsers = existingUsers ? JSON.parse(existingUsers) : [];

      // Check for existing email to prevent duplicates
      const emailExists = registeredUsers.some(
        (user: { email: string }) =>
          user.email.toLowerCase() === userData.email.toLowerCase()
      );

      if (emailExists) {
        return { success: false, message: "Email already exists" };
      }

      // Add new user
      registeredUsers.push(userData);

      // Save back to localStorage
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
      return { success: true };
    } catch (e) {
      console.error("Error saving registered user to localStorage", e);
      return { success: false, message: "Storage error" };
    }
  }
  return { success: false, message: "Browser storage not available" };
};

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

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
    // If user is already authenticated, redirect to home
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = (data: FormData) => {
    dispatch(registerRequest());

    // Normalize email to prevent case-sensitivity issues
    const normalizedEmail = data.email.trim().toLowerCase();

    // Simulate API call with delay
    setTimeout(() => {
      // Create a new user with a more reliable ID
      const timestamp = new Date().getTime();
      const uniqueId = `user_${timestamp}_${Math.floor(Math.random() * 1000)}`;

      const newUser: RegisterUser = {
        id: uniqueId,
        name: data.name,
        email: normalizedEmail,
        password: data.password,
      };

      // Save user to localStorage for login functionality
      const result = saveRegisteredUser(newUser);

      if (result.success) {
        dispatch(registerSuccess(newUser as User));
        // Initialize user-specific appointments (empty at registration)
        dispatch(loadUserAppointments());
        router.push("/");
      } else {
        if (result.message === "Email already exists") {
          dispatch(
            registerFailure(
              "This email is already registered. Please use a different email or sign in."
            )
          );
        } else {
          dispatch(registerFailure("Registration failed. Please try again."));
        }
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
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          Sign up
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mb: 3 }}
        >
          Create an account to book appointments with top doctors
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
            id="name"
            label="Full Name"
            autoComplete="name"
            autoFocus
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
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
            autoComplete="new-password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="primary">
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
