// src/app/login/page.tsx
"use client";

import LoginForm from "@/components/auth/forms/LoginForm";
import { RootState } from "@/store";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Container, Divider, Paper, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const redirect = searchParams.get("redirect") || "/";
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    // Small delay to ensure auth state is current
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.push(redirect);
      }
      setCheckedAuth(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, redirect, router]);

  if (!checkedAuth) {
    return null; // Don't render anything until auth check completes
  }

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

        <LoginForm />

        <Divider sx={{ width: "100%", my: 2 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          For demo: use john@example.com / password123
        </Typography>
      </Paper>
    </Container>
  );
}
