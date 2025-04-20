"use client";

import AppointmentsList from "@/components/doctors/AppointmentsList";
import DoctorCard from "@/components/doctors/DoctorCard";
import SpecialtyFilter from "@/components/doctors/SpecialtyFilter";
import { Doctor } from "@/helpers/mockData";
import { DoctorsResponse, useDoctors } from "@/hooks/useDoctors";
import {
  Box,
  CircularProgress,
  Container,
  Pagination,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

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
  const [currentPage, setCurrentPage] = useState(1);

  // Add state to force loading indicator
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [displayedData, setDisplayedData] = useState<DoctorsResponse | null>(
    null
  );

  const doctorsPerPage = 6;

  // Use React Query for fetching doctors with pagination
  const { data, isLoading, isError, error, isFetching } = useDoctors(
    currentPage,
    doctorsPerPage,
    selectedSpecialty
  );

  // Update displayed data when query completes
  useEffect(() => {
    if (data && !isFetching) {
      setDisplayedData(data);
      setIsPaginationLoading(false);
    }
  }, [data, isFetching]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // Force loading state and hide current data
    setIsPaginationLoading(true);
    setDisplayedData(null);

    // Update page after setting loading state
    setCurrentPage(value);

    // Scroll to top of doctor listings
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to first page when specialty filter changes
  const handleSpecialtyChange = (specialty: string | null) => {
    setIsPaginationLoading(true);
    setDisplayedData(null);
    setSelectedSpecialty(specialty);
    setCurrentPage(1);
  };

  // Calculate pagination values for display
  const doctorsData = displayedData || (data as DoctorsResponse | undefined);
  const startIndex = doctorsData ? (currentPage - 1) * doctorsPerPage + 1 : 0;
  const endIndex = doctorsData
    ? Math.min(currentPage * doctorsPerPage, doctorsData.totalCount)
    : 0;

  // Show loading in these cases
  const showLoading = isLoading || isPaginationLoading || (isFetching && !data);

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
            onFilterChange={handleSpecialtyChange}
          />

          {/* Show loading spinner when loading initial data or changing pagination */}
          {showLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : isError ? (
            <Box sx={{ py: 4, textAlign: "center" }}>
              <Typography variant="h6" color="error" gutterBottom>
                Error loading doctors
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {error?.message || "Please try again later"}
              </Typography>
            </Box>
          ) : doctorsData && doctorsData.doctors.length === 0 ? (
            <Box sx={{ py: 4, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No doctors found for this specialty.
              </Typography>
              <Typography
                variant="button"
                color="primary"
                sx={{ cursor: "pointer", display: "inline-block", mt: 2 }}
                onClick={() => handleSpecialtyChange(null)}
              >
                View all doctors
              </Typography>
            </Box>
          ) : (
            doctorsData && (
              <>
                <Box sx={{ mt: 3 }}>
                  {doctorsData.doctors.map((doctor: Doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </Box>

                {/* Pagination controls */}
                {doctorsData.totalPages > 1 && (
                  <Stack spacing={2} sx={{ mt: 4, alignItems: "center" }}>
                    <Pagination
                      count={doctorsData.totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      showFirstButton
                      showLastButton
                      disabled={isFetching || isPaginationLoading}
                    />

                    <Typography variant="body2" color="text.secondary">
                      Showing {startIndex}-{endIndex} of{" "}
                      {doctorsData.totalCount} doctors
                    </Typography>
                  </Stack>
                )}
              </>
            )
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
