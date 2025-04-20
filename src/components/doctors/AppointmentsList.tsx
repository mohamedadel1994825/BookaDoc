"use client";

import { Appointment } from "@/helpers/mockData";
import { RootState } from "@/store";
import { removeAppointment } from "@/store/slices/appointmentsSlice";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function AppointmentsList() {
  const dispatch = useDispatch();
  const appointments = useSelector(
    (state: RootState) => state.appointments.appointments
  );

  const handleCancelAppointment = (appointmentId: string) => {
    dispatch(removeAppointment(appointmentId));
  };

  if (appointments.length === 0) {
    return (
      <Card>
        <CardContent sx={{ py: 5, textAlign: "center" }}>
          <EventBusyIcon
            color="action"
            sx={{ fontSize: 48, mb: 2, opacity: 0.6 }}
          />
          <Typography variant="h6" gutterBottom color="text.secondary">
            No appointments booked yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your scheduled appointments will appear here.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stack spacing={2} aria-label="Your appointments">
      {appointments.map((appointment: Appointment) => (
        <Card
          key={appointment.id}
          variant="outlined"
          sx={{
            borderLeft: 4,
            borderColor: "primary.main",
            borderRadius: 1,
          }}
          aria-label={`Appointment with ${appointment.doctorName}`}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                  {appointment.doctorName}
                </Typography>
                <Typography variant="body1" color="primary" gutterBottom>
                  {appointment.doctorSpecialty}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ textAlign: { sm: "right" } }}>
                <Typography variant="body1" fontWeight="medium">
                  {appointment.dateTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {appointment.location}
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Button
                size="small"
                color="error"
                onClick={() => handleCancelAppointment(appointment.id)}
                aria-label={`Cancel appointment with ${appointment.doctorName}`}
              >
                Cancel Appointment
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
