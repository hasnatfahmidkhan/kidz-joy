import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import SectionHeader from "@/components/shared/SectionHeader";
import { getFeaturedProducts } from "@/lib/db/getFeaturedProducts";

const FeaturedProducts = async () => {
  const products = await getFeaturedProducts();

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <SectionHeader
        subtitle="Picked just for you"
        title="Featured Products"
        viewAllHref="/shop"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          // ── Derive discount info from your data shape ──
          const hasDiscount = product.discount > 0;
          const discountedPrice = hasDiscount
            ? (
                product.price -
                (product.price * product.discount) / 100
              ).toFixed(2)
            : null;

          return (
            <div
              key={product._id}
              className="group bg-base-100 rounded-2xl border border-base-200 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* ── Image ── */}
              <Link
                href={`/products/${product._id}`}
                className="relative block bg-base-200 aspect-square overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />

                {/* Discount badge */}
                {hasDiscount && (
                  <span className="badge badge-error absolute top-3 left-3 text-white border-none text-[10px] font-bold">
                    {product.discount}% OFF
                  </span>
                )}
              </Link>

              {/* ── Info ── */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                {/* Title */}
                <Link
                  href={`/products/${product._id}`}
                  className="font-bold text-neutral text-sm leading-snug hover:text-primary transition-colors duration-150 line-clamp-2"
                >
                  {product.title}
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <FiStar
                    size={12}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  <span className="text-xs font-semibold text-neutral">
                    {product.ratings}
                  </span>
                  <span className="text-xs text-neutral/40">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Sold count */}
                <p className="text-[11px] text-neutral/40">
                  {product.sold} sold
                </p>

                {/* Price + Cart */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-base-200">
                  <div className="flex flex-col">
                    <span className="font-black text-primary text-base">
                      ৳{hasDiscount ? discountedPrice : product.price}
                    </span>
                    {hasDiscount && (
                      <span className="text-neutral/40 text-xs line-through">
                        ৳{product.price}
                      </span>
                    )}
                  </div>
                  <button className="btn btn-primary btn-sm btn-circle">
                    <FiShoppingCart size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;
