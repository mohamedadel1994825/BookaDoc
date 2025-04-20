"use client";

import { useGetProductQuery } from "@/services/productsApi";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import ProductDetails from "./components/ProductDetails";

export default function ProductPage() {
  const { id } = useParams(); // Get 'id' from the URL parameters
  const router = useRouter();

  // Ensure 'id' is a string
  const productId = Array.isArray(id) ? id[0] : id; // Extract the first element if it's an array

  const {
    data: product,
    error,
    isLoading,
  } = useGetProductQuery(productId as string); // Ensure 'id' is treated as a string

  useEffect(() => {
    if (!productId) {
      router.push("/"); // Redirect to home if 'id' is undefined or invalid
    }
  }, [productId, router]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box p={3}>
        <Typography color="error">{"Product not found"}</Typography>
        <Button
          variant="contained"
          onClick={() => router.push("/")}
          sx={{ mt: 2 }}
        >
          Return to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <ProductDetails id={productId as string} />
    </Box>
  );
}
