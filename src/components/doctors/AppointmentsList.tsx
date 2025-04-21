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
import { useDispatch, useSelector } from "react-redux";

interface AppointmentsListProps {
  onSwitchToFindDoctors?: () => void;
}

export default function AppointmentsList({
  onSwitchToFindDoctors,
}: AppointmentsListProps) {
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
            <Box
              component="img"
              src="https://plus.unsplash.com/premium_photo-1661740544720-179bf4643323?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHxtYWxlJTIwZG9jdG9yfGVufDB8fDB8fHww"
              alt="Doctor with stethoscope"
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Typography variant="h6" gutterBottom color="text.secondary">
            No appointments booked yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your scheduled appointments will appear here.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={onSwitchToFindDoctors}
          >
            Find Doctors
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stack spacing={2} aria-label="Your appointments" role="list">
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
          role="listitem"
          tabIndex={0}
        >
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              {/* Avatar Grid Item */}
              <Grid item xs={3} sm={1}>
                <Avatar
                  sx={{
                    width: { xs: 40, sm: 50 },
                    height: { xs: 40, sm: 50 },
                    border: "2px solid",
                    borderColor: "primary.light",
                    marginLeft: { xs: "auto", sm: 0 },
                    marginRight: { xs: "auto", sm: 0 },
                  }}
                  alt={appointment.doctorName}
                  src={appointment.doctorPhoto}
                  aria-hidden="true" // Image is decorative since name is already announced
                />
              </Grid>

              {/* Doctor Info Grid Item */}
              <Grid item xs={9} sm={5}>
                <Typography
                  variant="h6"
                  component="h1" // Using heading for better document structure
                  gutterBottom
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                    marginBottom: { xs: 0.5, sm: 1 },
                  }}
                  id={`doctor-name-${appointment.id}`}
                >
                  {appointment.doctorName}
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  aria-describedby={`doctor-name-${appointment.id}`}
                >
                  {appointment.doctorSpecialty}
                </Typography>
              </Grid>

              {/* Appointment Details Grid Item */}
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  textAlign: { xs: "left", sm: "right" },
                  mt: { xs: 1, sm: 0 },
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  aria-label={`Appointment time: ${appointment.dateTime}`}
                >
                  {appointment.dateTime}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  aria-label={`Location: ${appointment.location}`}
                >
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCancelAppointment(appointment.id);
                  }
                }}
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
