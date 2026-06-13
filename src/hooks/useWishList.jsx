"use client";
import { useState, useEffect } from "react";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("kidz-joy-wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  // Save to localStorage on change
  const saveWishlist = (updated) => {
    setWishlist(updated);
    localStorage.setItem("kidz-joy-wishlist", JSON.stringify(updated));
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);
    if (exists) {
      saveWishlist(wishlist.filter((item) => item._id !== product._id));
      return false; // removed
    } else {
      saveWishlist([...wishlist, product]);
      return true; // added
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  return { wishlist, toggleWishlist, isWishlisted };
};
