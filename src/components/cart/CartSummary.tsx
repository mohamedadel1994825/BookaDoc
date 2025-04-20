import { CartItem } from "@/types/cart";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

interface CartSummaryProps {
  items: CartItem[];
  onClearCart: () => void;
  isClearing: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  items,
  onClearCart,
  isClearing,
}) => {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const router = useRouter();
  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "stretch", sm: "center" },
        gap: { xs: 2, sm: 3 },
      }}
    >
      <Button
        variant="outlined"
        color="error"
        onClick={onClearCart}
        disabled={isClearing}
        startIcon={<DeleteIcon />}
        sx={{
          width: { xs: "100%", sm: "180px", md: "200px", lg: "220px" },
          py: { xs: 1.25, sm: 1.5 },
          alignSelf: "flex-end",
          fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "error.light",
            color: "white",
          },
        }}
      >
        Clear Cart
      </Button>
      <Box
        sx={{
          textAlign: { xs: "center", sm: "right" },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontSize: {
              xs: "1.25rem",
              sm: "1.375rem",
              md: "1.5rem",
              lg: "1.75rem",
            },
            fontWeight: 600,
            mb: { xs: 1, sm: 1.5 },
          }}
        >
          Total: ${calculateTotal().toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => router.push("/checkout")}
          sx={{
            width: { xs: "100%", sm: "200px", md: "220px", lg: "240px" },
            py: { xs: 1.25, sm: 1.5 },

            fontSize: {
              xs: "0.9375rem",
              sm: "1rem",
              md: "1.125rem",
              lg: "1.25rem",
            },
            fontWeight: 600,
            boxShadow: 2,
            "&:hover": {
              backgroundColor: "primary.dark",
              boxShadow: 4,
            },
          }}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartSummary;
