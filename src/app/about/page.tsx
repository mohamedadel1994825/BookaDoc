"use client";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicationIcon from "@mui/icons-material/Medication";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: { xs: 3, md: 6 } }}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            About InVitro Capital Doctors
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="h2"
            sx={{ maxWidth: 800, mx: "auto" }}
          >
            Connecting patients with the best healthcare professionals through
            innovative technology
          </Typography>
          <Divider sx={{ my: 4 }} />
        </Box>

        <Box sx={{ mb: 6 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h3" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                At InVitro Capital Doctors, our mission is to make quality
                healthcare accessible to everyone. We believe that finding and
                scheduling appointments with the right medical professionals
                should be simple, transparent, and efficient.
              </Typography>
              <Typography variant="body1" paragraph>
                Our platform connects patients with a diverse network of
                healthcare specialists, offering a seamless booking experience
                that saves time and reduces the stress often associated with
                managing healthcare needs.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1612349316228-5942a9b489c2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzIyfHxtYWxlJTIwZG9jdG9yJTIwZ3JvdXAlMjB3aXRoJTIwYmFsdG98ZW58MHx8MHx8fDA%3D"
                alt="Medical professionals"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ textAlign: "center", mb: 4 }}
          >
            Why Choose InVitro Capital Doctors?
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                icon: <MedicationIcon fontSize="large" color="primary" />,
                title: "Expert Specialists",
                description:
                  "Access to top-rated doctors across multiple specialties, each vetted for their expertise and quality of care.",
              },
              {
                icon: <AccessTimeIcon fontSize="large" color="primary" />,
                title: "Convenient Scheduling",
                description:
                  "Book appointments on your schedule with our easy-to-use platform – anytime, anywhere.",
              },
              {
                icon: <LocalHospitalIcon fontSize="large" color="primary" />,
                title: "Comprehensive Care",
                description:
                  "From routine check-ups to specialized treatments, we connect you with the right care for your needs.",
              },
              {
                icon: <PersonIcon fontSize="large" color="primary" />,
                title: "Patient-Centered Approach",
                description:
                  "Your health and satisfaction are our top priorities, with transparent processes and responsive support.",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      {feature.icon}
                      <Typography variant="h6" component="h4" sx={{ ml: 2 }}>
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            Our Story
          </Typography>
          <Typography variant="body1" paragraph>
            Founded in 2023, InVitro Capital Doctors emerged from a simple
            observation: finding and booking medical appointments shouldn't be
            complicated. Our founders, experienced in both healthcare and
            technology, set out to create a solution that bridges the gap
            between patients and healthcare providers.
          </Typography>
          <Typography variant="body1" paragraph>
            Starting with a small network of specialists in major metropolitan
            areas, we've quickly grown to include hundreds of healthcare
            professionals across multiple specialties. Our commitment to
            quality, accessibility, and user experience continues to drive our
            innovation and expansion.
          </Typography>
          <Typography variant="body1">
            Today, we're proud to be a trusted healthcare partner for thousands
            of patients, helping them navigate their healthcare journey with
            confidence and ease.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
