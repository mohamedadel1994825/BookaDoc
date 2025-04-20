"use client";

import RegistrationForm from "@/components/auth/forms/RegistrationForm";
import { RootState } from "@/store";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

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

        <RegistrationForm />

        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="primary">
                Already have an account? Sign in
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
