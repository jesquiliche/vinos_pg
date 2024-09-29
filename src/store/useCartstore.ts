"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProductCart {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

interface CartItem extends ProductCart {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  totalItems: number;
  addToCart: (product: ProductCart) => void;
  removeFromCart: (productId: number) => void;
  removeAllFromCart: (productId: number) => void; // Nueva función
  clearCart: () => void;
  updateProductQuantity: (productId: number, quantity: number) => void;
  getTotalCost: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      totalItems: 0,

      addToCart: (product: ProductCart) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item.id === product.id
          );
          if (existingProduct) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              totalItems: state.totalItems + 1,
            };
          } else {
            return {
              cart: [...state.cart, { ...product, quantity: 1 }],
              totalItems: state.totalItems + 1,
            };
          }
        }),

      removeFromCart: (productId: number) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item.id === productId
          );
          if (!existingProduct) return state;

          if (existingProduct.quantity > 1) {
            return {
              cart: state.cart.map((item) =>
                item.id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
              totalItems: state.totalItems - 1,
            };
          } else {
            return {
              cart: state.cart.filter((item) => item.id !== productId),
              totalItems: state.totalItems - 1,
            };
          }
        }),

      removeAllFromCart: (productId: number) =>
        set((state) => {
          const updatedCart = state.cart.filter((item) => item.id !== productId);
          const totalItems = updatedCart.reduce(
            (total, item) => total + item.quantity,
            0
          );
          return { cart: updatedCart, totalItems };
        }),

      clearCart: () => set({ cart: [], totalItems: 0 }),

      updateProductQuantity: (productId: number, quantity: number) =>
        set((state) => {
          const updatedCart = state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );
          const totalItems = updatedCart.reduce(
            (total, item) => total + item.quantity,
            0
          );
          return { cart: updatedCart, totalItems };
        }),

      getTotalCost: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) => total + item.precio * item.quantity,
          0
        );
      },
    }),
    {
      name: "shopping-cart", // Key for localStorage
    }
  )
);

export default useCartStore;
