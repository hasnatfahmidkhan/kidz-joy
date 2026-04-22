import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart, FiStar } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(product.price - (product.price * product.discount) / 100)
    : product.price;

  return (
    <div className="group bg-base-100 rounded-2xl border border-base-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* ── Image ── */}
      <Link
        href={`/products/${product._id}`}
        className="relative block bg-base-200 aspect-square overflow-hidden shrink-0"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-error text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
      </Link>

      {/* ── Info ── */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Category */}
        <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
          {product.category}
        </span>

        {/* Title */}
        <Link
          href={`/products/${product._id}`}
          className="font-bold text-neutral text-sm leading-snug hover:text-primary transition-colors duration-150 line-clamp-2 flex-1"
        >
          {product.title}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <FiStar size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-neutral">
            {product.ratings}
          </span>
          <span className="text-xs text-neutral/40">({product.reviews})</span>
          <span className="text-xs text-neutral/30 ml-auto">
            {product.sold} sold
          </span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-base-200">
          <div className="flex flex-col">
            <span className="font-black text-primary text-base leading-none">
              ৳{discountedPrice}
            </span>
            {hasDiscount && (
              <span className="text-neutral/40 text-xs line-through mt-0.5">
                ৳{product.price}
              </span>
            )}
          </div>

          <button
            className="btn btn-primary btn-sm btn-circle shadow-sm hover:scale-110 transition-transform duration-150"
            aria-label={`Add ${product.title} to cart`}
          >
            <FiShoppingCart size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
