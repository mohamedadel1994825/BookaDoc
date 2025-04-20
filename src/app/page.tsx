"use client";

import AppointmentsList from "@/components/doctors/AppointmentsList";
import DoctorCard from "@/components/doctors/DoctorCard";
import SpecialtyFilter from "@/components/doctors/SpecialtyFilter";
import { doctors } from "@/helpers/mockData";
import { Box, Container, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  id: string;
  ariaLabelledby: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, id, ariaLabelledby, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={id}
      aria-labelledby={ariaLabelledby}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function HomePage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null
  );
  const [tabValue, setTabValue] = useState(0);

  const filteredDoctors = selectedSpecialty
    ? doctors.filter((doctor) => doctor.specialty === selectedSpecialty)
    : doctors;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          InVitro Capital Doctors
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Find and book appointments with top healthcare specialists
        </Typography>
      </Box>

      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          aria-label="doctor booking tabs"
        >
          <Tab
            label="Find Doctors"
            id="doctors-tab"
            aria-controls="doctors-panel"
          />
          <Tab
            label="My Appointments"
            id="appointments-tab"
            aria-controls="appointments-panel"
          />
        </Tabs>

        <TabPanel
          value={tabValue}
          index={0}
          id="doctors-panel"
          ariaLabelledby="doctors-tab"
        >
          <SpecialtyFilter
            selectedSpecialty={selectedSpecialty}
            onFilterChange={setSelectedSpecialty}
          />

          {filteredDoctors.length > 0 ? (
            <Box sx={{ mt: 3 }}>
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </Box>
          ) : (
            <Box sx={{ py: 4, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No doctors found for this specialty.
              </Typography>
              <Typography
                variant="button"
                color="primary"
                sx={{ cursor: "pointer", display: "inline-block", mt: 2 }}
                onClick={() => setSelectedSpecialty(null)}
              >
                View all doctors
              </Typography>
            </Box>
          )}
        </TabPanel>

        <TabPanel
          value={tabValue}
          index={1}
          id="appointments-panel"
          ariaLabelledby="appointments-tab"
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Your Appointments
          </Typography>
          <AppointmentsList />
        </TabPanel>
      </Paper>
    </Container>
  );
}
