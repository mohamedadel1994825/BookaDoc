"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Form validation schema
const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"),
    subject: yup.string().required("Subject is required"),
    message: yup
      .string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters"),
  })
  .required();

type FormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      try {
        console.log("Form submitted:", data);
        setSuccess(true);
        reset();
      } catch (err) {
        setError("There was an error sending your message. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        paragraph
        sx={{ maxWidth: 700, mx: "auto", mb: 4 }}
      >
        Have questions about our services? Need help with booking an
        appointment? We're here to help!
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 4, height: "100%" }}>
            <Typography variant="h5" gutterBottom>
              Our Information
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Feel free to reach out to us through any of the following
              channels:
            </Typography>

            <Box sx={{ my: 4 }}>
              <Box sx={{ display: "flex", mb: 3 }}>
                <LocationOnIcon
                  color="primary"
                  sx={{ mr: 2, alignSelf: "flex-start", mt: 0.5 }}
                />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Address
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    123 Medical Plaza, <br />
                    Suite 456, <br />
                    San Francisco, CA 94107
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", mb: 3 }}>
                <PhoneIcon
                  color="primary"
                  sx={{ mr: 2, alignSelf: "flex-start", mt: 0.5 }}
                />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Phone
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +1 (555) 123-4567
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex" }}>
                <EmailIcon
                  color="primary"
                  sx={{ mr: 2, alignSelf: "flex-start", mt: 0.5 }}
                />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Email
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    contact@invitrocapitaldoctors.com
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Hours of Operation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monday - Friday: 8:00 AM - 8:00 PM <br />
              Saturday: 9:00 AM - 5:00 PM <br />
              Sunday: Closed
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Send Us a Message
            </Typography>

            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Your message has been sent successfully! We'll get back to you
                soon.
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={isSubmitting || success}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    disabled={isSubmitting || success}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number (optional)"
                    {...register("phone")}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    disabled={isSubmitting || success}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Subject"
                    {...register("subject")}
                    error={!!errors.subject}
                    helperText={errors.subject?.message}
                    disabled={isSubmitting || success}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    multiline
                    rows={4}
                    {...register("message")}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    disabled={isSubmitting || success}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={isSubmitting || success}
                    endIcon={
                      isSubmitting ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <SendIcon />
                      )
                    }
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
