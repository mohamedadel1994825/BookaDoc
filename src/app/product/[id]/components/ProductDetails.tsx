"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Box, Card, Grid, Rating, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import { useGetProductQuery } from "@/services/productsApi";

export default function ProductDetails({ id }: { id: string }) {
  const router = useRouter();
  const { data: product, isLoading, error } = useGetProductQuery(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">Error loading product details</Typography>
      </Box>
    );
  }

  if (!product) {
    router.push("/404");
    return null;
  }

  // Log the product data to check the structure
  console.log("product====",);

  return (
    <Box sx={{ p: 3 ,minWidth: 250 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "background.paper",
                p: 2,
                minHeight: "400px",
              }}
            >
              <img
                src={product.image || '/placeholder-image.jpg'} // Fallback for image
                alt={product.title}
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.title || "Product Title"} {/* Fallback for title */}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price || "N/A"} {/* Fallback for price */}
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Rating value={product.rating?.rate || 0} readOnly />
            <Typography variant="body2" color="text.secondary" ml={1}>
              ({product.rating?.count || 0} reviews) {/* Fallback for rating count */}
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {product.description || "No description available."} {/* Fallback for description */}
          </Typography>
          <AddToCartButton product={product} />
        </Grid>
      </Grid>
    </Box>
  );
}
