"use client";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";

const CartButton = ({ product }) => {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const { addToCart } = useCart();

  const handleAdd2Cart = () => {
    const isLogin = session?.status === "authenticated";
    if (isLogin) {
      const cartItem = {
        productId: product._id,
        email: session?.data?.user?.email,
        title: product.title,
        image: product.image,
        price: product.price,
        discount: product.discount,
        category: product.category,
      };

      addToCart(cartItem);
      toast.success(`${product.title}added successfully!`);
    } else {
      router.push(`/login?callbackUrl=${pathname}`);
    }
  };
  return (
    <button
      onClick={handleAdd2Cart}
      className="btn btn-primary btn-lg flex-1 rounded-2xl gap-3 shadow-lg shadow-primary/20 py-2.5"
    >
      <FiShoppingCart size={20} /> Add to Cart
    </button>
  );
};

export default CartButton;
