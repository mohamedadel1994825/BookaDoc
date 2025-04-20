
export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
  }
  
  export interface ToastState {
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }