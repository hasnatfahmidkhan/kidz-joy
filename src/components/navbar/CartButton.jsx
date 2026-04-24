"use client";

import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

const CartButton = () => {
  const { cartCount, mounted } = useCart();

  return (
    <Link
      href="/cart"
      className="btn btn-ghost btn-circle btn-sm text-white relative"
      aria-label="Cart"
    >
      <FiShoppingCart size={21} />
      {mounted && cartCount > 0 && (
        <span className="badge badge-accent badge-xs absolute -top-0.5 -right-0.5 font-bold text-[10px] min-w-4 h-4 p-0 flex items-center justify-center">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
