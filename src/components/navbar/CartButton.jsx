import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

const CartButton = ({ count = 0 }) => {
  return (
    <Link
      href="/cart"
      className="btn btn-ghost btn-circle btn-sm text-white relative"
      aria-label={`Cart, ${count} item${count !== 1 ? "s" : ""}`}
    >
      <FiShoppingCart size={21} />
      {count > 0 && (
        <span className="badge badge-accent badge-xs absolute -top-0.5 -right-0.5 font-bold text-[10px] min-w-4 h-4 p-0 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
};

export default CartButton;