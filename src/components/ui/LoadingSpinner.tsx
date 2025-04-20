"use client";

import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box display="flex" justifyContent="center" p={3}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
