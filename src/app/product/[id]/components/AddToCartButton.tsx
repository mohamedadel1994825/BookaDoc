// AddToCartButton.tsx
"use client";

import { RootState } from "@/store";
import { addItem, updateQuantity } from "@/store/slices/cartSlice";
import { Product } from "@/types/product";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Alert,
  Box,
  Button,
  Fade,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isAdding, setIsAdding] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  // Check if product is already in cart
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setToast({
        open: true,
        message: "Please login to add items to cart",
        severity: "info",
      });
      setIsRedirecting(true);
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return;
    }

    if (isInCart) {
      return;
    }

    setIsAdding(true);
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
        description: product?.description,
        category: product?.category,
        rating: product?.rating,
      })
    );

    setToast({
      open: true,
      message: `${product.title} added to cart!`,
      severity: "success",
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleQuantityChange = async (newQuantity: number) => {
    try {
      // if (process.env.NODE_ENV === "production") {
      //   await updateQuantity({ id: product.id, quantity: newQuantity });
      // } else {
      //   dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
      // }
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));

      setToast({
        open: true,
        message: `Quantity updated to ${newQuantity}`,
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to update quantity:", error);
      setToast({
        open: true,
        message: "Failed to update quantity. Please try again.",
        severity: "error",
      });
    }
  };

  const cartItem = cartItems.find((item) => item.id === product.id);

  useEffect(() => {
    if (isRedirecting) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isRedirecting, router]);

  const animateAddToCart = () => {
    // Get navbar cart icon position
    const cartIcon = document.querySelector(
      ".MuiSvgIcon-root[data-testid='ShoppingCartIcon']"
    );
    if (!cartIcon || !buttonRef.current) return;

    const startRect = buttonRef.current.getBoundingClientRect();
    const endRect = cartIcon.getBoundingClientRect();

    // Create animated element
    const animatedElement = document.createElement("div");
    animatedElement.style.position = "fixed";
    animatedElement.style.zIndex = "9999";
    animatedElement.style.left = `${startRect.left + startRect.width / 2}px`;
    animatedElement.style.top = `${startRect.top + startRect.height / 2}px`;
    animatedElement.style.transform = "translate(-50%, -50%)";
    animatedElement.style.transition =
      "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)";
    animatedElement.style.opacity = "1";
    animatedElement.style.pointerEvents = "none";

    // Create icon in the animated element
    const icon = document.createElement("div");
    icon.innerHTML = `
      <svg style="width: 30px; height: 30px; color: #2196f3; background: white; border-radius: 50%; padding: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);" viewBox="0 0 24 24">
        <path fill="currentColor" d="M11,9H13V6H16V4H13V1H11V4H8V6H11V9M7,18A2,2 0 0,0 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20A2,2 0 0,0 7,18M17,18A2,2 0 0,0 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20A2,2 0 0,0 17,18M7.17,14.75L7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.59 17.3,11.97L21.16,4.96L19.42,4H19.41L18.31,6L15.55,11H8.53L8.4,10.73L6.16,6L5.21,4L4.27,2H1V4H3L6.6,11.59L5.25,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42C7.29,15 7.17,14.89 7.17,14.75Z" />
      </svg>
    `;
    animatedElement.appendChild(icon);
    document.body.appendChild(animatedElement);

    // Trigger animation
    setTimeout(() => {
      animatedElement.style.left = `${endRect.left + endRect.width / 2}px`;
      animatedElement.style.top = `${endRect.top + endRect.height / 2}px`;
      animatedElement.style.transform = "translate(-50%, -50%) scale(0.3)";
      animatedElement.style.opacity = "0";
    }, 50);

    // Remove element after animation
    setTimeout(() => {
      document.body.removeChild(animatedElement);
    }, 800);
  };

  return (
    <>
      {isInCart && cartItem ? (
        <Box
          sx={{
            p: 0, m: 0,
            display: "flex",
            alignItems: "center",
            width: "100%",
            // height: "100%",
            minHeight: { xs: "36px", sm: "40px" },
          }}
        >
          <IconButton
            size="small"
            onClick={() => handleQuantityChange(cartItem.quantity - 1)}
            disabled={cartItem.quantity <= 1}
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              "&:hover": { backgroundColor: "primary.light" },
              width: { xs: "28px", sm: "32px" },
              height: { xs: "28px", sm: "32px" },
              padding: 0,
              "& .MuiSvgIcon-root": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
              mx: 0.5,
            }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography
            variant="body1"
            sx={{
              minWidth: { xs: "28px", sm: "32px" },
              textAlign: "center",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              fontWeight: 500,
            }}
          >
            {cartItem.quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={() => handleQuantityChange(cartItem.quantity + 1)}
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              "&:hover": { backgroundColor: "primary.light" },
              width: { xs: "28px", sm: "32px" },
              height: { xs: "28px", sm: "32px" },
              padding: 0,
              "& .MuiSvgIcon-root": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
              mx: 0.5,
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      ) : (
        <Button
          ref={buttonRef}
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          disabled={isAdding || isRedirecting}
          startIcon={isAdding ? <LoginIcon /> : <AddShoppingCartIcon />}
          sx={{
            width: "100%",
            minHeight: { xs: "36px", sm: "40px" },
            fontSize: { xs: "0.75rem", sm: "0.75rem", md: "0.875rem" },
            whiteSpace: "nowrap",
            py: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& .MuiButton-startIcon": {
              mr: { xs: 0.5, sm: 1 },
            },
          }}
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      )}

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={Fade}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}