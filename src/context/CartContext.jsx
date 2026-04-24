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
    } catch {
      setCart([]);
    }
    setMounted(true);
  }, []);

  // ── Persist on change ──
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("kidz_cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  // ── Add ──
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.productId,
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ── Remove ──
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  // ── Update quantity ──
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  };

  // ── Clear all ──
  const clearCart = () => setCart([]);

  // ── Derived values ──
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotal = cart.reduce((acc, item) => {
    const finalPrice =
      item.discount > 0
        ? Math.round(item.price - (item.price * item.discount) / 100)
        : item.price;
    return acc + finalPrice * item.quantity;
  }, 0);

  const cartOriginalTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const totalSavings = cartOriginalTotal - cartTotal;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        cartOriginalTotal,
        totalSavings,
        mounted,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = use(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
