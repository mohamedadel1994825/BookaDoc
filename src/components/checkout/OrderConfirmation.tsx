import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmailIcon from "@mui/icons-material/Email";
import { Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";

interface OrderConfirmationProps {
  orderNumber: string;
  shippingEmail: string;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  orderNumber,
  shippingEmail,
}) => {
  return (
    <Box sx={{ textAlign: "center", py: 3, overflow: "hidden" }}>
      <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 2 }} />

      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}>
        Order Confirmed!
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
        Thank you for your purchase
      </Typography>

      <Typography variant="body1" gutterBottom>
        Your order number is: <strong>{orderNumber}</strong>
      </Typography>

      <Paper
        elevation={1}
        sx={{
          p: 3,
          mt: 4,
          maxWidth: 600,
          mx: "auto",
          bgcolor: "grey.50",
          width: "100%", // Make it flexible on small screens
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          <EmailIcon
            color="primary"
            sx={{
              mr: { xs: 0, sm: 1 },
              mb: { xs: 1, sm: 0 },
              fontSize: { xs: "2rem", sm: "2.5rem" }, // Increase size on smaller screens
            }}
          />
          <Typography
            variant="body1"
            sx={{ textAlign: { xs: "center", sm: "left" }, fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            We have sent a confirmation email to{" "}
            <strong>{shippingEmail}</strong>
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            textAlign: { xs: "center", sm: "left" }, // Center text on small screens
          }}
        >
          You will receive an email when your order has shipped. If you have any
          questions about your order, please contact our customer service team.
        </Typography>
      </Paper>
    </Box>
  );
};

export default OrderConfirmation;
