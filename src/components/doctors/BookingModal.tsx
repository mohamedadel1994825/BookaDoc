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
import { useEffect, useState } from "react";
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

  useEffect(() => {
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
        )}`
      )}`;

      setTimeout(() => {
        setIsProcessing(false);
        router.push(redirectUrl);
      }, 1000);
      return;
    }

    // If authenticated, proceed to checkout
    setTimeout(() => {
      setIsProcessing(false);
      router.push(
        `/checkout?doctorId=${doctor.id}&doctorName=${doctor.name}&specialty=${
          doctor.specialty
        }&dateTime=${selectedSlot}&location=${encodeURIComponent(
          doctor.location
        )}`
      );
    }, 1000);
  };

  return (
    <Dialog
      open={true}
      onClose={isProcessing ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="booking-modal-title"
    >
      <DialogTitle id="booking-modal-title" sx={{ pb: 1 }}>
        Book Appointment
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">
            {doctor.name} - {doctor.specialty}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {doctor.location}
          </Typography>
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
        <Button onClick={onClose} color="inherit" disabled={isProcessing}>
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
