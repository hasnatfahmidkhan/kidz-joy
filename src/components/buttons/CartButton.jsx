"use client";
import { usePathname, useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";

const CartButton = ({ product }) => {
  const router = useRouter();
  const pathname = usePathname();

  const addToCart = () => {
    const isLogin = false;
    if (isLogin) {
      alert(product._id);
    } else {
      router.push(`/login?callbackUrl=${pathname}`);
    }
  };
  return (
    <button
      onClick={addToCart}
      className="btn btn-primary btn-lg flex-1 rounded-2xl gap-3 shadow-lg shadow-primary/20 py-2.5"
    >
      <FiShoppingCart size={20} /> Add to Cart
    </button>
  );
};

export default CartButton;
