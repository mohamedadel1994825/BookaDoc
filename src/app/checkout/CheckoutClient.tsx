// app/checkout/CheckoutClient.tsx
"use client";

import { RootState } from "@/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PaymentForm from "@/components/checkout/PaymentForm";
import { Appointment, doctors } from "@/helpers/mockData";
import { addAppointment } from "@/store/slices/appointmentsSlice";

const steps = ["Appointment Details", "Payment", "Confirmation"];

export default function CheckoutClient() {
  const [activeStep, setActiveStep] = useState(0);
  const [appointmentData, setAppointmentData] = useState<Appointment | null>(
    null
  );
  const [doctorPrice, setDoctorPrice] = useState<number>(0);
  const [doctorPhoto, setDoctorPhoto] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (searchParams) {
      const doctorId = searchParams.get("doctorId");
      const doctorName = searchParams.get("doctorName");
      const doctorSpecialty = searchParams.get("specialty");
      const dateTime = searchParams.get("dateTime");
      const location = searchParams.get("location");
      const doctorPhoto = searchParams.get("doctorPhoto");
      if (doctorId && doctorName && doctorSpecialty && dateTime && location) {
        setAppointmentData({
          id: Math.random().toString(36).substring(2, 11),
          doctorId,
          doctorName,
          doctorSpecialty,
          dateTime,
          location,
          doctorPhoto: doctorPhoto || "",
        });

        const doctor = doctors.find((doc) => doc.id === doctorId);
        if (doctor) {
          setDoctorPrice(doctor.price);
          setDoctorPhoto(doctor.photo);
        }
      } else {
        router.push("/");
      }
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(
        `/login?redirect=${encodeURIComponent(
          `/checkout?${searchParams.toString()}`
        )}`
      );
    }
  }, [isAuthenticated, router, searchParams]);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => {
    if (activeStep === 0) {
      router.push("/");
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };
  const handlePaymentSuccess = () => {
    if (appointmentData) {
      dispatch(addAppointment(appointmentData));
      handleNext();
    }
  };
  const handleFinish = () => router.push("/appointments");

  if (!appointmentData) return null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mb: 2 }}
          >
            {activeStep === 0 ? "Back to Doctors" : "Back"}
          </Button>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {activeStep === 0 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Appointment Details
            </Typography>
            <Box sx={{ my: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  component="img"
                  src={
                    doctorPhoto ||
                    "https://images.unsplash.com/photo-1615177393114-bd2917a4f74a?q=80&w=300&auto=format&fit=crop"
                  }
                  alt={appointmentData.doctorName}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    objectFit: "cover",
                    mr: 2,
                    border: "2px solid",
                    borderColor: "primary.light",
                    boxShadow: 1,
                  }}
                />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {appointmentData.doctorName}
                  </Typography>
                  <Typography variant="body1" color="primary.main">
                    {appointmentData.doctorSpecialty}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" gutterBottom>
                <strong>Date & Time:</strong> {appointmentData.dateTime}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Location:</strong> {appointmentData.location}
              </Typography>
              <Typography variant="body1" color="primary.main" gutterBottom>
                <strong>Consultation Fee:</strong> ${doctorPrice.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ mt: 4, textAlign: "right" }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, ml: 1 }}
              >
                Proceed to Payment
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 1 && (
          <PaymentForm
            appointmentDetails={{
              doctorName: appointmentData.doctorName,
              specialty: appointmentData.doctorSpecialty,
              dateTime: appointmentData.dateTime,
              price: doctorPrice,
              doctorPhoto: doctorPhoto,
            }}
            onSuccess={handlePaymentSuccess}
          />
        )}

        {activeStep === 2 && (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
              Your Appointment is Confirmed!
            </Typography>
            <Typography variant="body1" paragraph>
              We have sent a confirmation email with all the details.
            </Typography>
            <Typography variant="body1" paragraph>
              You can view all your appointments in your dashboard.
            </Typography>
            <Button variant="contained" onClick={handleFinish} sx={{ mt: 3 }}>
              View My Appointments
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
