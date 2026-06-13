"use client";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useWishlist } from "@/hooks/useWishList";

const FavouriteButton = ({ product }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [isFav, setIsFav] = useState(false);

  // Sync with localStorage on mount
  useEffect(() => {
    setIsFav(isWishlisted(product._id));
  }, [product._id, isWishlisted]);

  const handleToggle = () => {
    const added = toggleWishlist(product);
    setIsFav(added);

    if (added) {
      toast.success("Added to wishlist! 💖");
    } else {
      toast("Removed from wishlist", { icon: "💔" });
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`btn btn-lg btn-square rounded-2xl border transition-all duration-200 ${
        isFav
          ? "btn-error border-error text-white" // ❤️ filled — wishlisted
          : "btn-ghost border-base-300" // 🤍 outline — not wishlisted
      }`}
      title={isFav ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isFav ? (
        <FaHeart size={20} /> // ❤️ filled
      ) : (
        <FiHeart size={20} /> // 🤍 outline
      )}
    </button>
  );
};

export default FavouriteButton;
