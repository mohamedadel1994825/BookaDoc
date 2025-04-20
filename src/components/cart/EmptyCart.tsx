import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";

const EmptyCart: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 4, sm: 6, md: 8 },
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: 80, sm: 100, md: 120 },
          height: { xs: 80, sm: 100, md: 120 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "primary.light",
          borderRadius: "50%",
          mb: 3,
        }}
      >
        <ShoppingCartOutlinedIcon
          sx={{
            fontSize: { xs: 40, sm: 50, md: 60 },
            color: "white",
          }}
        />
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          mb: 2,
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        Your Cart is Empty
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          mb: 4,
          maxWidth: "600px",
          fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
        }}
      >
        Looks like you haven't added any items to your cart yet. Start
        shopping to discover amazing products!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        component={Link}
        href="/"
        startIcon={<ShoppingCartOutlinedIcon />}
        sx={{
          px: { xs: 3, sm: 4 },
          py: { xs: 1.25, sm: 1.5 },
          fontSize: { xs: "0.875rem", sm: "1rem" },
          borderRadius: 2,
          boxShadow: 2,
          "&:hover": {
            boxShadow: 4,
            backgroundColor: "primary.dark",
          },
        }}
      >
        Start Shopping
      </Button>
    </Box>
  );
};

export default EmptyCart;