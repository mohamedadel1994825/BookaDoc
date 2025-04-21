"use client";

import { Doctor } from "@/helpers/mockData";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import BookingModal from "./BookingModal";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Card
      sx={{
        mb: 2,
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.01)" },
        boxShadow: 2,
        overflow: "hidden",
      }}
      aria-label={`Doctor card for ${doctor.name}`}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", sm: "30%", md: "25%", lg: "20%" },
            maxWidth: { sm: 200 },
            minWidth: { sm: 150 },
            height: { xs: 200, sm: "auto" },
            bgcolor: "background.default",
            overflow: "hidden",
            borderRadius: {
              xs: "4px 4px 0 0",
              sm: "4px 0 0 4px",
            },
            "&::before": {
              content: '""',
              display: { xs: "none", sm: "block" },
              paddingTop: "100%",
            },
          }}
        >
          <Box
            component="img"
            src={doctor.photo}
            alt={doctor.name}
            sx={{
              position: { xs: "relative", sm: "absolute" },
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            loading="lazy"
          />
        </Box>

        <CardContent
          sx={{
            flex: "1 1 auto",
            p: { xs: 2, sm: 3 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: { xs: "100%", sm: "70%", md: "75%", lg: "80%" },
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                mb: 2,
                gap: 1,
              }}
            >
              <Box>
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  component="h2"
                  gutterBottom
                >
                  {doctor.name}
                </Typography>

                <Typography
                  variant="subtitle1"
                  component="p"
                  color="primary"
                  gutterBottom
                  aria-label={`Specialty: ${doctor.specialty}`}
                >
                  {doctor.specialty}
                </Typography>

                <Typography
                  variant="body2"
                  component="p"
                  color="text.secondary"
                  gutterBottom
                >
                  {doctor.location}
                </Typography>

                <Typography
                  variant="body2"
                  component="p"
                  color="primary.dark"
                  sx={{ fontWeight: "bold", mt: 1 }}
                  aria-label={`Consultation fee: $${doctor.price.toFixed(2)}`}
                >
                  Consultation Fee: ${doctor.price.toFixed(2)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: { xs: "flex-start", sm: "center" },
                  mt: { xs: 1, sm: 0 },
                }}
              >
                <Rating
                  value={doctor.rating}
                  precision={0.1}
                  readOnly
                  size={isMobile ? "small" : "medium"}
                />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {doctor.rating}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              gap: { xs: 2, sm: 1 },
              mt: { xs: 2, sm: 0 },
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                flexWrap: "wrap",
                gap: 1,
                display: { xs: "flex", sm: "flex" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 1,
                }}
              >
                {doctor.availability
                  .slice(0, isTablet ? 2 : 3)
                  .map((slot, index) => (
                    <Chip
                      key={index}
                      label={slot}
                      size="small"
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                      aria-label={`Availability: ${slot}`}
                    />
                  ))}
              </Box>

              {doctor.availability.length > (isTablet ? 2 : 3) && (
                <Chip
                  label={`+${
                    doctor.availability.length - (isTablet ? 2 : 3)
                  } more`}
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: 1, cursor: "pointer" }}
                  onClick={openModal}
                />
              )}
            </Stack>

            <Button
              variant="contained"
              color="primary"
              onClick={openModal}
              sx={{
                minWidth: "120px",
                alignSelf: { xs: "stretch", sm: "flex-end" },
              }}
              aria-label={`Book appointment with ${doctor.name}`}
              fullWidth={isMobile}
            >
              Book Now
            </Button>
          </Box>
        </CardContent>
      </Box>

      {isModalOpen && <BookingModal doctor={doctor} onClose={closeModal} />}
    </Card>
  );
}
