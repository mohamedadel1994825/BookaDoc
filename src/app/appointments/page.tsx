"use client";

import AppointmentsList from "@/components/doctors/AppointmentsList";
import { RootState } from "@/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AppointmentsPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { appointments } = useSelector(
    (state: RootState) => state.appointments
  );
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/appointments");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          sx={{ mb: 2 }}
        >
          Back to Home
        </Button>
      </Box>
      
      <Paper sx={{ p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            My Appointments
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {appointments.length > 0
              ? "Manage your upcoming appointments"
              : "You don't have any appointments yet."}
          </Typography>
        </Box>

        <AppointmentsList />

        {appointments.length === 0 && (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Box
              component="img"
              src="/calendar-empty.svg"
              alt="Empty appointments"
              sx={{
                width: "100%",
                maxWidth: 200,
                height: "auto",
                opacity: 0.6,
                mb: 2,
              }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No appointments scheduled
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Book an appointment with one of our doctors to get started.
            </Typography>
            <Button
              component={Link}
              href="/"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Browse Doctors
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
