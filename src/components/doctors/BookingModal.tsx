"use client";

import { Doctor } from "@/helpers/mockData";
import { RootState } from "@/store";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ToggleButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

interface BookingModalProps {
  doctor: Doctor;
  onClose: () => void;
}

export default function BookingModal({ doctor, onClose }: BookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleSelectSlot = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleConfirmBooking = () => {
    if (!selectedSlot) return;

    setIsProcessing(true);

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      // Construct redirect URL back to this doctor with the selected time slot
      const redirectUrl = `/login?redirect=${encodeURIComponent(
        `/checkout?doctorId=${doctor.id}&doctorName=${doctor.name}&specialty=${
          doctor.specialty
        }&dateTime=${selectedSlot}&location=${encodeURIComponent(
          doctor.location
        )}&doctorPhoto=${encodeURIComponent(doctor.photo)}`
      )}`;

      // Use shorter delay to prevent UI issues
      setTimeout(() => {
        setIsProcessing(false);
        onClose(); // Close modal first to prevent UI issues
        router.push(redirectUrl);
      }, 500);
      return;
    }

    // If authenticated, proceed to checkout
    // Use shorter delay to prevent UI issues
    setTimeout(() => {
      setIsProcessing(false);
      onClose(); // Close modal first to prevent UI issues
      router.push(
        `/checkout?doctorId=${doctor.id}&doctorName=${doctor.name}&specialty=${
          doctor.specialty
        }&dateTime=${selectedSlot}&location=${encodeURIComponent(
          doctor.location
        )}&doctorPhoto=${encodeURIComponent(doctor.photo)}`
      );
    }, 500);
  };

  // Create a stable handler for closing
  const handleClose = () => {
    if (!isProcessing) {
      onClose();
    }
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="booking-modal-title"
      // Fix scrolling but maintain stability
      keepMounted
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        "& .MuiDialog-paper": {
          margin: { xs: "16px", sm: "32px" },
          width: "calc(100% - 32px)",
          maxHeight: "calc(100% - 32px)",
        },
      }}
      slotProps={{
        backdrop: {
          onClick: handleClose,
        },
      }}
    >
      <DialogTitle id="booking-modal-title" sx={{ pb: 1 }}>
        Book Appointment
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={doctor.photo}
            alt={doctor.name}
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
            <Typography variant="h6">
              {doctor.name} - {doctor.specialty}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {doctor.location}
            </Typography>
          </Box>
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          Available Time Slots
        </Typography>
        <Grid container spacing={1} sx={{ mb: 3 }}>
          {doctor.availability.map((slot, index) => (
            <Grid item xs={6} key={index}>
              <ToggleButton
                value={slot}
                selected={selectedSlot === slot}
                onChange={() => handleSelectSlot(slot)}
                fullWidth
                size="small"
                sx={{
                  justifyContent: "center",
                  textTransform: "none",
                }}
              >
                {slot}
              </ToggleButton>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} color="inherit" disabled={isProcessing}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirmBooking}
          disabled={!selectedSlot || isProcessing}
          startIcon={
            isProcessing ? (
              <CircularProgress size={20} color="inherit" />
            ) : undefined
          }
        >
          {isProcessing ? "Processing..." : "Continue to Checkout"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
