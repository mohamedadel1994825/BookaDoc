import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const ContinueShoppingButton: React.FC = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 3,
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 10,
        p: 2,
      }}
    >
      <Button
        variant="outlined"
        onClick={onClick}
        startIcon={<ArrowBackIcon />}
        sx={{ alignSelf: "flex-start" }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
};

export default ContinueShoppingButton;
