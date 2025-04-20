"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Form validation schema
const schema = yup
  .object({
    cardName: yup.string().required("Name on card is required"),
    cardNumber: yup
      .string()
      .required("Card number is required")
      .matches(/^\d{16}$/, "Card number must be 16 digits"),
    expDate: yup
      .string()
      .required("Expiration date is required")
      .matches(
        /^(0[1-9]|1[0-2])\/\d{2}$/,
        "Expiration date must be in MM/YY format"
      ),
    cvv: yup
      .string()
      .required("CVV is required")
      .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  })
  .required();

type FormData = {
  cardName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
};

interface PaymentFormProps {
  appointmentDetails: {
    doctorName: string;
    specialty: string;
    dateTime: string;
    price: number;
    doctorPhoto?: string; // Optional doctor photo URL
  };
  onSuccess: () => void;
}

export default function PaymentForm({
  appointmentDetails,
  onSuccess,
}: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setError(null);

    // Simulate payment processing with a delay
    setTimeout(() => {
      setLoading(false);

      // For demo purposes, always succeed
      setSuccess(true);

      // Call the success callback after a brief delay to show success message
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  // Fallback image if no doctor photo is provided
  const defaultDoctorImage =
    "https://images.unsplash.com/photo-1615177393114-bd2917a4f74a?q=80&w=300&auto=format&fit=crop";

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Payment Details
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Appointment Summary
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    component="img"
                    src={appointmentDetails.doctorPhoto || defaultDoctorImage}
                    alt={appointmentDetails.doctorName}
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      objectFit: "cover",
                      mr: 2,
                      border: "2px solid",
                      borderColor: "primary.light",
                      boxShadow: 1,
                    }}
                  />
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {appointmentDetails.doctorName}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {appointmentDetails.specialty}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  <strong>Date & Time:</strong> {appointmentDetails.dateTime}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  ${appointmentDetails.price.toFixed(2)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Consultation fee
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success ? (
        <Box sx={{ textAlign: "center", py: 3 }}>
          <EventAvailableIcon color="success" sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h6" gutterBottom color="success.main">
            Payment Successful!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your appointment has been confirmed.
          </Typography>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <CreditCardIcon sx={{ mr: 1, fontSize: 18 }} />
                  Credit Card Information
                </Typography>
              </Divider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name on Card"
                {...register("cardName")}
                error={!!errors.cardName}
                helperText={errors.cardName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                inputProps={{ maxLength: 16 }}
                {...register("cardNumber")}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiration Date"
                placeholder="MM/YY"
                inputProps={{ maxLength: 5 }}
                {...register("expDate")}
                error={!!errors.expDate}
                helperText={errors.expDate?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                type="password"
                inputProps={{ maxLength: 4 }}
                {...register("cvv")}
                error={!!errors.cvv}
                helperText={errors.cvv?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  `Pay $${appointmentDetails.price.toFixed(2)}`
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
