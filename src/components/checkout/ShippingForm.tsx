// src/components/checkout/ShippingForm.tsx
import React from 'react';
import { 
  Grid, 
  TextField, 
  Typography, 
  FormControlLabel, 
  Checkbox, 
  Button,
  Box 
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

interface ShippingFormProps {
  initialData: any;
  onSubmit: (data: any) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ initialData, onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'First name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="First name"
                fullWidth
                variant="outlined"
                error={!!errors.firstName}
                helperText={errors.firstName?.message?.toString()}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Last name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last name"
                fullWidth
                variant="outlined"
                error={!!errors.lastName}
                helperText={errors.lastName?.message?.toString()}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Controller
            name="address1"
            control={control}
            rules={{ required: 'Address is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address line 1"
                fullWidth
                variant="outlined"
                error={!!errors.address1}
                helperText={errors.address1?.message?.toString()}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Controller
            name="address2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address line 2 (optional)"
                fullWidth
                variant="outlined"
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={control}
            rules={{ required: 'City is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                fullWidth
                variant="outlined"
                error={!!errors.city}
                helperText={errors.city?.message?.toString()}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="state"
            control={control}
            rules={{ required: 'State/Province is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="State/Province/Region"
                fullWidth
                variant="outlined"
                error={!!errors.state}
                helperText={errors.state?.message?.toString()}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="postalCode"
            control={control}
            rules={{ required: 'Postal code is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Zip / Postal code"
                fullWidth
                variant="outlined"
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message?.toString()}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="country"
            control={control}
            rules={{ required: 'Country is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Country"
                fullWidth
                variant="outlined"
                error={!!errors.country}
                helperText={errors.country?.message?.toString()}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="email"
            control={control}
            rules={{ 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Invalid email address'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message?.toString()}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="phone"
            control={control}
            rules={{ required: 'Phone number is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                variant="outlined"
                error={!!errors.phone}
                helperText={errors.phone?.message?.toString()}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Controller
            name="saveAddress"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={field.onChange}
                    color="primary"
                  />
                }
                label="Save this address for future orders"
              />
            )}
          />
        </Grid>
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button type="submit" variant="contained" color="primary">
          Continue to Payment
        </Button>
      </Box>
    </form>
  );
};

export default ShippingForm;