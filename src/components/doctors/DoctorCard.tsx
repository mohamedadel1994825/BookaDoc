"use client";

import { Doctor } from "@/helpers/mockData";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import BookingModal from "./BookingModal";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      }}
      aria-label={`Doctor card for ${doctor.name}`}
    >
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Box
          sx={{
            width: { xs: "100%", md: 160 },
            height: { xs: 200, md: "auto" },
            position: "relative",
            overflow: "hidden",
            borderRadius: { xs: 0, md: "4px 0 0 4px" },
          }}
        >
          <Avatar
            src={doctor.photo}
            alt={doctor.name}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "inherit",
            }}
            slotProps={{
              img: {
                style: {
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                },
              },
            }}
            variant="square"
          />
        </Box>
        <CardContent sx={{ flex: "1 1 auto", p: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h5" component="h2" gutterBottom>
                {doctor.name}
              </Typography>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                {doctor.specialty}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {doctor.location}
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary.dark"
                sx={{ fontWeight: "bold", mt: 1 }}
              >
                Consultation Fee: ${doctor.price.toFixed(2)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: { xs: 1, md: 0 },
              }}
            >
              <Rating
                value={doctor.rating}
                precision={0.1}
                readOnly
                size="small"
              />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {doctor.rating}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                flexWrap: "wrap",
                gap: 1,
                display: { xs: "none", sm: "flex" },
              }}
            >
              {doctor.availability.slice(0, 3).map((slot, index) => (
                <Chip
                  key={index}
                  label={slot}
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                />
              ))}
              {doctor.availability.length > 3 && (
                <Chip
                  label={`+${doctor.availability.length - 3} more`}
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                />
              )}
            </Stack>
            <Button
              variant="contained"
              color="primary"
              onClick={openModal}
              sx={{ minWidth: "120px" }}
              aria-label={`Book appointment with ${doctor.name}`}
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
