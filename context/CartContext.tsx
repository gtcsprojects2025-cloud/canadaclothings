// context/CartContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '@/lib/types';

// type CartItem = Product & {
//   // id: string; // Unique identifier for cart item (can be product ID or a generated ID)
//   quantity: number;
//   selectedSize?: string;
// };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size?: string) => {
    setCart((prev) => {
      // Handle both MongoDB _id and regular id
      const productId = (product as any)._id || product._id;

      const existingIndex = prev.findIndex(
        (item) => {
          const itemId = (item as any)._id || item._id;
          return itemId === productId && item.selectedSize === size;
        }
      );

      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { 
        ...product, 
        quantity: 1, 
        selectedSize: size,
        // Ensure we have an id for cart operations
        _id: productId 
      }];
    });
  };

  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => {
      const itemId = (item as any)._id || item._id;
      return itemId !== id;
    }));
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => {
        const itemId = (item as any)._id || item._id;
        return itemId === id ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getTotalItems = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};