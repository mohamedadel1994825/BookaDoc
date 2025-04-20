// src/components/checkout/OrderSummary.tsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Divider, 
  Grid, 
  Button,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';

interface OrderSummaryProps {
  items: any[];
  shippingData: any;
  paymentData: any;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  items, 
  shippingData, 
  paymentData 
}) => {
  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10; // Fixed shipping cost
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Shipping
          </Typography>
          <Typography gutterBottom>{shippingData.firstName} {shippingData.lastName}</Typography>
          <Typography gutterBottom>{shippingData.address1}</Typography>
          {shippingData.address2 && <Typography gutterBottom>{shippingData.address2}</Typography>}
          <Typography gutterBottom>
            {shippingData.city}, {shippingData.state} {shippingData.postalCode}
          </Typography>
          <Typography gutterBottom>{shippingData.country}</Typography>
          <Typography gutterBottom>{shippingData.email}</Typography>
          <Typography gutterBottom>{shippingData.phone}</Typography>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <Typography gutterBottom>Card Holder: {paymentData.cardName}</Typography>
            <Typography gutterBottom>
              Card Number: •••• •••• •••• {paymentData.cardNumber.slice(-4)}
            </Typography>
            <Typography gutterBottom>Expiry Date: {paymentData.expDate}</Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            
            <List disablePadding>
              {items.map((item) => (
                <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                  <Typography variant="body2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
              
              <Divider sx={{ my: 2 }} />
              
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Subtotal" />
                <Typography variant="body1">
                  ${subtotal.toFixed(2)}
                </Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Shipping" />
                <Typography variant="body1">
                  ${shipping.toFixed(2)}
                </Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Tax" />
                <Typography variant="body1">
                  ${tax.toFixed(2)}
                </Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  ${total.toFixed(2)}
                </Typography>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderSummary;
