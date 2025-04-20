import React from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ClearCartDialogProps {
  open: boolean;
  onClose: () => void;
  onClear: () => void;
  isClearing: boolean;
}

const ClearCartDialog: React.FC<ClearCartDialogProps> = ({
  open,
  onClose,
  onClear,
  isClearing,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="clear-cart-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="clear-cart-dialog-title">
        Clear Shopping Cart
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to clear your cart? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          p: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1, sm: 2 },
          "& > *": {
            width: { xs: "100%", sm: "200px" },
            m: 0,
            p: 0,
            "&.MuiButton-root": {
              margin: 0,
            },
          },
        }}
      >
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          sx={{
            py: { xs: 1.25, sm: 1.5 },
            fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
            fontWeight: 500,
            margin: 0,
            padding: 0,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onClear}
          color="error"
          variant="contained"
          disabled={isClearing}
          startIcon={
            isClearing ? <CircularProgress size={20} /> : <DeleteIcon />
          }
          sx={{
            py: { xs: 1.25, sm: 1.5 },
            fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
            fontWeight: 500,
            margin: 0,
            padding: 0,
            "&:hover": {
              backgroundColor: "error.dark",
            },
          }}
        >
          {isClearing ? "Clearing..." : "Clear Cart"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClearCartDialog;