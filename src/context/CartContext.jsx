"use client";

import { createContext, use, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);

  // ── Load from localStorage on mount ──
  useEffect(() => {
    try {
      const stored = localStorage.getItem("kidz_cart");
      if (stored) setCart(JSON.parse(stored));
    } catch (error) {
      setCart([]);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("kidz_cart", JSON.stringify(cart));
  }, [cart, mounted]);

  // Actions
  //! Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.productId,
      );
      if (existing) {
        // just increment quantity
        return prev.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      // add new item
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const contextValue = {
    cart,
    setCart,
    addToCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = use(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
