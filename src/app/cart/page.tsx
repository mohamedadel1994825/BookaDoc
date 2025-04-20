// src/pages/cart/index.tsx or src/app/cart/page.tsx (for Next.js App Router)
"use client";

import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CartSummary from "@/components/cart/CartSummary";
import ClearCartDialog from "@/components/cart/ClearCartDialog";
import ContinueShopping from "@/components/cart/ContinueShopping";
import EmptyCart from "@/components/cart/EmptyCart";
import SortableCartList from "@/components/cart/SortableCartList";
import { RootState } from "@/store";
import {
  clearCart,
  removeItem,
  reorderItems,
  updateQuantity,
  useClearCartMutation,
  useRemoveFromCartMutation,
} from "@/store/slices/cartSlice";
import { ToastState } from "@/types/cart";
import { useRouter } from "next/navigation";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items } = useSelector((state: RootState) => state.cart);
  const [removeFromCart, { isLoading: isRemoving }] =
    useRemoveFromCartMutation();
  const [clearCartMutation, { isLoading: isClearing }] = useClearCartMutation();

  // State for item being removed
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);

  // Toast state
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    severity: "info",
  });

  const [openClearDialog, setOpenClearDialog] = useState(false);

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };
  const handleContinueShopping = () => {
    router.push("/"); // Navigate to home page
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex(
        (item) => item.id.toString() === active.id
      );
      const newIndex = items.findIndex(
        (item) => item.id.toString() === over.id
      );

      const reorderedItems = arrayMove(items, oldIndex, newIndex);

      dispatch(reorderItems(reorderedItems));

      setToast({
        open: true,
        message: "Cart items reordered successfully",
        severity: "success",
      });
    }
  };

  const handleRemoveItem = async (id: number) => {
    setRemovingItemId(id);
    try {
      // Try to use API in production
      // if (process.env.NODE_ENV === "production") {
      //   await removeFromCart(id).unwrap();
      // } else {
      //   // Use local state in development
      //   dispatch(removeItem(id));
      // }
      dispatch(removeItem(id));
      setToast({
        open: true,
        message: "Item removed from cart",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to remove item:", error);
      setToast({
        open: true,
        message: "Failed to remove item. Please try again.",
        severity: "error",
      });
    } finally {
      setRemovingItemId(null);
    }
  };

  const handleClearCart = async () => {
    try {
      // if (process.env.NODE_ENV === "production") {
      //   await clearCartMutation("").unwrap();
      // } else {
      //   dispatch(clearCart());
      // }
      dispatch(clearCart());
      setToast({
        open: true,
        message: "Cart cleared successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to clear cart:", error);
      setToast({
        open: true,
        message: "Failed to clear cart. Please try again.",
        severity: "error",
      });
    } finally {
      setOpenClearDialog(false);
    }
  };

  const handleQuantityChange = async (id: number, newQuantity: number) => {
    try {
      // if (process.env.NODE_ENV === "production") {
      //   // In production, we would call an API to update the quantity
      //   dispatch(updateQuantity({ id, quantity: newQuantity }));
      // } else {
      //   dispatch(updateQuantity({ id, quantity: newQuantity }));
      // }
      dispatch(updateQuantity({ id, quantity: newQuantity }));

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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <ContinueShopping />
          <SortableCartList
            items={items}
            onDragEnd={handleDragEnd}
            onRemoveItem={handleRemoveItem}
            onQuantityChange={handleQuantityChange}
            removingItemId={removingItemId}
          />

          {items.length > 0 && (
            <CartSummary
              items={items}
              onClearCart={() => setOpenClearDialog(true)}
              isClearing={isClearing}
            />
          )}
        </>
      )}

      <ClearCartDialog
        open={openClearDialog}
        onClose={() => setOpenClearDialog(false)}
        onClear={handleClearCart}
        isClearing={isClearing}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
    </Box>
  );
};

export default CartPage;
