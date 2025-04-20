import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
      gap={2}
    >
      <Typography variant="h5">Product Not Found</Typography>
      <Typography>Could not find the requested product.</Typography>
      <Button component={Link} href="/" variant="contained">
        Return Home
      </Button>
    </Box>
  );
}
 