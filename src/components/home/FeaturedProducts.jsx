import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import SectionHeader from "@/components/shared/SectionHeader";
import { getFeaturedProducts } from "@/lib/db/getFeaturedProducts";

// // 🔁 Replace with DB data later
// const products = [
//   {
//     id: 1,
//     name: "Robo Builder Kit",
//     slug: "robo-builder-kit",
//     price: 34.99,
//     originalPrice: 44.99,
//     rating: 4.8,
//     reviews: 128,
//     image: "/images/products/robo-builder.png",
//     badge: "Best Seller",
//     badgeColor: "badge-primary",
//   },
//   {
//     id: 2,
//     name: "Magic Puzzle 500pc",
//     slug: "magic-puzzle-500",
//     price: 19.99,
//     originalPrice: null,
//     rating: 4.6,
//     reviews: 84,
//     image: "/images/products/magic-puzzle.png",
//     badge: "New",
//     badgeColor: "badge-accent",
//   },
//   {
//     id: 3,
//     name: "Fluffy Bear Plush",
//     slug: "fluffy-bear-plush",
//     price: 24.99,
//     originalPrice: 29.99,
//     rating: 4.9,
//     reviews: 210,
//     image: "/images/products/fluffy-bear.png",
//     badge: "Sale",
//     badgeColor: "badge-error",
//   },
//   {
//     id: 4,
//     name: "Space Explorer Set",
//     slug: "space-explorer-set",
//     price: 49.99,
//     originalPrice: null,
//     rating: 4.7,
//     reviews: 67,
//     image: "/images/products/space-explorer.png",
//     badge: null,
//     badgeColor: null,
//   },
// ];

const FeaturedProducts = async () => {
  const products = await getFeaturedProducts();
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <SectionHeader
        subtitle="Picked just for you"
        title="Featured Products"
        viewAllHref="/shop"
      />

      {/* ── Product Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="group bg-base-100 rounded-2xl border border-base-200 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col"
          >
            {/* Image */}
            <Link
              href={`/products/${product.slug}`}
              className="relative block bg-base-200 aspect-square overflow-hidden"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
              {/* Badge */}
              {product.badge && (
                <span
                  className={`badge ${product.badgeColor} absolute top-3 left-3 text-white border-none text-[10px] font-bold`}
                >
                  {product.badge}
                </span>
              )}
            </Link>

            {/* Info */}
            <div className="p-4 flex flex-col gap-2 flex-1">
              <Link
                href={`/products/${product.slug}`}
                className="font-bold text-neutral text-sm leading-snug hover:text-primary transition-colors duration-150 line-clamp-2"
              >
                {product.name}
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <FiStar size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold text-neutral">
                  {product.rating}
                </span>
                <span className="text-xs text-neutral/40">
                  ({product.reviews})
                </span>
              </div>

              {/* Price + Cart */}
              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex flex-col">
                  <span className="font-black text-primary text-base">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-neutral/40 text-xs line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <button className="btn btn-primary btn-sm btn-circle">
                  <FiShoppingCart size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
