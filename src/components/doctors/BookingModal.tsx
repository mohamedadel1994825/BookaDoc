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
      aria-describedby="booking-modal-description"
      role="dialog"
      keepMounted
    >
      <DialogTitle id="booking-modal-title" sx={{ pb: 1 }}>
        Book Appointment with {doctor.name}
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{ mb: 3, display: "flex", alignItems: "center" }}
          id="booking-modal-description"
        >
          {/* ... doctor image and info ... */}
        </Box>

        <Typography variant="subtitle1" gutterBottom id="available-slots-label">
          Available Time Slots
        </Typography>
        <Grid
          container
          spacing={1}
          sx={{ mb: 3 }}
          role="group"
          aria-labelledby="available-slots-label"
        >
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
                aria-label={`Select time slot: ${slot}`}
              >
                {slot}
              </ToggleButton>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleClose}
          color="inherit"
          aria-label="Cancel booking"
        >
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
          aria-label={`Confirm booking at ${selectedSlot}`}
        >
          {isProcessing ? "Processing..." : "Continue to Checkout"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
