"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

const BuyNowButton = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart(); 

  const handleBuyNow = async () => {
    setLoading(true);
    try {
      // Step 1: Add to cart first
      addToCart(product);

      // Step 2: Redirect to checkout
      router.push("/checkout");
    } catch (error) {
      console.error("Buy now error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuyNow}
      disabled={loading}
      className="btn btn-neutral btn-lg border-2 rounded-2xl flex-1"
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        "Buy Now"
      )}
    </button>
  );
};

export default BuyNowButton;
