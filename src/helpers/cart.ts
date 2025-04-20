import { Product } from "@/types/product";

export const getCartKey = (userId: string) => `cart_${userId}`;
export const saveCart = (userId: string, items: Product[]) => {
    if (typeof window !== 'undefined' && userId) {
        try {
            localStorage.setItem(getCartKey(userId), JSON.stringify(items));
        } catch (error) {
            console.error(`Error saving cart for ${userId}:`, error);
        }
    }
};