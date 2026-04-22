import ProductCard from "@/components/shared/ProductCard";
import { FiPackage } from "react-icons/fi";

const ProductGrid = ({ products, totalCount, currentPage, limit }) => {
  const start = ((currentPage - 1) * limit) + 1;
  const end   = Math.min(currentPage * limit, totalCount);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <FiPackage size={48} className="text-neutral/20" />
        <h3 className="text-lg font-black text-neutral/40">
          No products found
        </h3>
        <p className="text-sm text-neutral/30">
          Try adjusting your filters or search term
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Count */}
      <p className="text-xs text-neutral/40 font-semibold mb-4">
        Showing{" "}
        <span className="text-neutral font-black">{start}–{end}</span>{" "}
        of{" "}
        <span className="text-neutral font-black">{totalCount}</span>{" "}
        products
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;