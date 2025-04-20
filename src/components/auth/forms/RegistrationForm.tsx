"use client";

import { RegisterFormData, registerSchema } from "@/schemas/authSchemas";
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
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Define local interfaces for the component
interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

interface StoredUser {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    severity: "info",
  });

  // Store all existing emails for validation
  const [existingEmails, setExistingEmails] = useState<string[]>([]);

  // Initialize the list of existing emails
  useEffect(() => {
    const emails: string[] = [];

    // Check registered_users
    try {
      const existingUsers = localStorage.getItem("registered_users");
      if (existingUsers) {
        const users: StoredUser[] = JSON.parse(existingUsers);
        users.forEach((user) => {
          if (user.email && typeof user.email === "string") {
            emails.push(user.email.trim().toLowerCase());
          }
        });
      }
    } catch (e) {
      console.error("Error reading registered_users:", e);
    }

    // Check currentUser
    try {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        const user = JSON.parse(currentUser);
        if (user.email && typeof user.email === "string") {
          emails.push(user.email.trim().toLowerCase());
        }
      }
    } catch (e) {
      console.error("Error reading currentUser:", e);
    }

    // Check user in auth state
    try {
      const userInAuth = localStorage.getItem("user");
      if (userInAuth) {
        const user = JSON.parse(userInAuth);
        if (user.email && typeof user.email === "string") {
          emails.push(user.email.trim().toLowerCase());
        }
      }
    } catch (e) {
      console.error("Error reading auth user:", e);
    }

    // Remove duplicates
    const uniqueEmails = [...new Set(emails)];
    console.log("Existing emails loaded:", uniqueEmails);
    setExistingEmails(uniqueEmails);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  const onSubmit = (formData: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Normalize the email
      const normalizedEmail = formData.email.trim().toLowerCase();
      console.log("Attempting to register with email:", normalizedEmail);
      console.log("Existing emails:", existingEmails);

      // Direct and simple check for duplicate email
      if (existingEmails.includes(normalizedEmail)) {
        console.log("EMAIL ALREADY EXISTS!");
        setError(
          "This email address is already registered. Please use a different email or log in."
        );
        setIsLoading(false);
        return;
      }

      // Get registered users
      const existingUsersStr = localStorage.getItem("registered_users");
      const existingUsers: StoredUser[] = existingUsersStr
        ? JSON.parse(existingUsersStr)
        : [];

      // Double-check by directly searching through users again (belt and suspenders)
      for (const user of existingUsers) {
        if (user.email && user.email.trim().toLowerCase() === normalizedEmail) {
          console.log("Double-check caught duplicate email:", normalizedEmail);
          setError(
            "This email address is already registered. Please use a different email or log in."
          );
          setIsLoading(false);
          return;
        }
      }

      // Check for duplicate username (case-insensitive)
      const normalizedUsername = formData.username.trim().toLowerCase();
      const usernameExists = existingUsers.some(
        (user) =>
          user.username &&
          typeof user.username === "string" &&
          user.username.toLowerCase() === normalizedUsername
      );

      if (usernameExists) {
        setError("Username already exists. Please choose another one.");
        setIsLoading(false);
        return;
      }

      // Create new user with normalized email
      const newUser: StoredUser = {
        userId: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        password: formData.password,
        email: normalizedEmail, // Store normalized email
      };

      // Add to existingEmails state to prevent immediate re-registration
      setExistingEmails([...existingEmails, normalizedEmail]);

      // Add to the users array and save back to localStorage
      existingUsers.push(newUser);
      localStorage.setItem("registered_users", JSON.stringify(existingUsers));

      // Log for debugging
      console.log("Registration successful with email:", normalizedEmail);
      console.log("Updated registered users count:", existingUsers.length);

      // Set the registration flag for AuthInitializer to detect
      sessionStorage.setItem("justRegistered", "true");

      setToast({
        open: true,
        message: "Registration successful! Redirecting to login...",
        severity: "success",
      });

      // Keep loading state active until redirect completes
      // Wait for the toast to be visible before redirecting
      setTimeout(() => {
        router.push("/login?registered=true");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
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
        Register
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="First Name"
        {...register("firstName")}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Last Name"
        {...register("lastName")}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Username"
        {...register("username")}
        error={!!errors.username}
        helperText={errors.username?.message}
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

      <TextField
        fullWidth
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

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
        label="Address"
        {...register("address")}
        error={!!errors.address}
        helperText={errors.address?.message}
        sx={{ mb: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? <CircularProgress size={24} /> : "Register"}
      </Button>
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
