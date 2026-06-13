import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export const metadata = {
  title: "Add Product",
};

export default function AddProductPage() {
  return (
    <div>
      {/* ── Header ── */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/products"
          className="btn btn-ghost btn-sm btn-circle border border-base-200"
        >
          <FiArrowLeft size={16} />
        </Link>
        <div>
          <p className="text-primary font-semibold text-sm mb-1">Admin</p>
          <h1 className="text-2xl font-black text-neutral">Add New Product</h1>
        </div>
      </div>

      <ProductForm />
    </div>
  );
}
