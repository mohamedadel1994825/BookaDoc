"use client";

import { Appointment } from "@/helpers/mockData";
import { RootState } from "@/store";
import { removeAppointment } from "@/store/slices/appointmentsSlice";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
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
          <Box
            sx={{
              position: "relative",
              width: 100,
              height: 100,
              mx: "auto",
              mb: 2,
            }}
          >
            <Image
              src="https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg"
              alt="Doctor with stethoscope"
              fill
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          </Box>
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
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={1}>
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    border: "2px solid",
                    borderColor: "primary.light",
                  }}
                  alt={appointment.doctorName}
                  src={`https://randomuser.me/api/portraits/men/${
                    parseInt(appointment.doctorId) % 50
                  }.jpg?v=2&s=200`}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
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
