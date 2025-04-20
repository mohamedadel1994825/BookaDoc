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
  Fade,
  LinearProgress,
  Pagination,
  PaginationItem,
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
  const [clickedPage, setClickedPage] = useState<number | null>(null);
  const doctorsPerPage = 6;

  // Use React Query for fetching doctors with pagination
  const { data, isLoading, isError, error, isFetching } = useDoctors(
    currentPage,
    doctorsPerPage,
    selectedSpecialty
  );

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // Track which page was clicked for visual feedback
    setClickedPage(value);
    setCurrentPage(value);
    // Scroll to top of doctor listings
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset clicked page when fetching completes
  useEffect(() => {
    if (!isFetching && clickedPage !== null) {
      setClickedPage(null);
    }
  }, [isFetching]);

  // Reset to first page when specialty filter changes
  const handleSpecialtyChange = (specialty: string | null) => {
    setSelectedSpecialty(specialty);
    setCurrentPage(1);
  };

  // Calculate pagination values for display
  const doctorsData = data as DoctorsResponse | undefined;
  const startIndex = doctorsData ? (currentPage - 1) * doctorsPerPage + 1 : 0;
  const endIndex = doctorsData
    ? Math.min(currentPage * doctorsPerPage, doctorsData.totalCount)
    : 0;

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

          {/* Show pagination loading indicator when fetching new page */}
          {isFetching && !isLoading && (
            <Fade in={true} style={{ transitionDelay: "300ms" }}>
              <LinearProgress sx={{ mt: 1, mb: 2 }} />
            </Fade>
          )}

          {isLoading ? (
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
                    {/* Loading indicator above pagination */}
                    {isFetching && (
                      <Box sx={{ width: "100%", maxWidth: 500, mb: 0 }}>
                        <LinearProgress
                          color="primary"
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            "& .MuiLinearProgress-bar": {
                              animationDuration: "0.5s",
                            },
                          }}
                        />
                      </Box>
                    )}

                    <Pagination
                      count={doctorsData.totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      showFirstButton
                      showLastButton
                      disabled={isFetching}
                      renderItem={(item) => {
                        // Add visual indicator to the clicked page button
                        const isClickedPage =
                          isFetching &&
                          clickedPage === item.page &&
                          item.type === "page";

                        // Add visual indicator to navigation buttons
                        const isClickedNav =
                          isFetching &&
                          ((clickedPage === currentPage + 1 &&
                            item.type === "next") ||
                            (clickedPage === currentPage - 1 &&
                              item.type === "previous") ||
                            (clickedPage === 1 && item.type === "first") ||
                            (clickedPage === doctorsData.totalPages &&
                              item.type === "last"));

                        return (
                          <Box sx={{ position: "relative" }}>
                            {(isClickedPage || isClickedNav) && (
                              <CircularProgress
                                size={38}
                                thickness={2}
                                sx={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  zIndex: 1,
                                }}
                              />
                            )}
                            <PaginationItem
                              {...item}
                              sx={{
                                opacity: isClickedPage ? 0.6 : 1,
                              }}
                            />
                          </Box>
                        );
                      }}
                    />

                    <Typography variant="body2" color="text.secondary">
                      Showing {startIndex}-{endIndex} of{" "}
                      {doctorsData.totalCount} doctors
                      {isFetching && (
                        <Box
                          component="span"
                          sx={{
                            ml: 1,
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        >
                          <CircularProgress size={12} sx={{ mr: 0.5 }} />
                          Loading...
                        </Box>
                      )}
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
