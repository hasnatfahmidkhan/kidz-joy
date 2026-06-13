"use client";
import { useWishlist } from "@/hooks/useWishList";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export default function WishlistPageClient() {
  const { wishlist, toggleWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-black text-neutral/40">
          Your wishlist is empty 💔
        </p>
        <Link href="/shop" className="btn btn-primary rounded-2xl">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black text-neutral mb-8">My Wishlist 💖</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {wishlist.map((product) => {
          const hasDiscount = product.discount > 0;
          const discountedPrice = hasDiscount
            ? Math.round(
                product.price - (product.price * product.discount) / 100,
              )
            : product.price;

          return (
            <div
              key={product._id}
              className="card card-side bg-base-100 border border-base-200 shadow rounded-2xl p-4 gap-4"
            >
              {/* Image */}
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-base-200 shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <Link
                    href={`/products/${product._id}`}
                    className="font-bold text-sm text-neutral hover:text-primary line-clamp-2"
                  >
                    {product.title}
                  </Link>
                  <p className="text-primary font-black mt-1">
                    ৳{discountedPrice}
                    {hasDiscount && (
                      <span className="text-neutral/40 line-through text-xs ml-2 font-normal">
                        ৳{product.price}
                      </span>
                    )}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-2">
                  <Link
                    href={`/products/${product._id}`}
                    className="btn btn-primary btn-sm rounded-xl flex-1"
                  >
                    View Product
                  </Link>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="btn btn-ghost btn-sm btn-square rounded-xl text-error"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
