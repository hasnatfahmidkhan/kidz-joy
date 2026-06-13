"use client";

import { createContext, use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { data: session, status } = useSession();

  const email = session?.user?.email;
  const cartKey = email ? `kidz_cart_${email}` : null;

  const [cart, setCart] = useState(() => {
    if (typeof window === "undefined" || !email) return [];

    try {
      const stored = localStorage.getItem(`kidz_cart_${email}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const saveCart = (newCart, key) => {
    if (typeof window === "undefined" || !key) return;
    localStorage.setItem(key, JSON.stringify(newCart));
  };

  // ── ADD TO CART ──
  const addToCart = (product) => {
    if (!email) return { ok: false };

    setCart((prev) => {
      let updated;

      const existing = prev.find(
        (item) => item.productId === product.productId,
      );

      if (existing) {
        updated = prev.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        updated = [...prev, { ...product, quantity: 1 }];
      }

      saveCart(updated, cartKey);
      return updated;
    });

    return { ok: true };
  };

  // ── REMOVE ──
  const removeFromCart = (productId) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.productId !== productId);

      saveCart(updated, cartKey);
      return updated;
    });
  };

  // ── UPDATE QUANTITY ──
  const updateQuantity = (productId, quantity) => {
    setCart((prev) => {
      let updated;

      if (quantity < 1) {
        updated = prev.filter((item) => item.productId !== productId);
      } else {
        updated = prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        );
      }

      saveCart(updated, cartKey);
      return updated;
    });
  };

  // ── CLEAR CART ──
  const clearCart = () => {
    setCart([]);
    if (cartKey && typeof window !== "undefined") {
      localStorage.removeItem(cartKey);
    }
  };

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
        status,
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
