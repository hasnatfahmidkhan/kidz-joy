import { getAdminProductById } from "@/lib/db/adminProducts";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export const metadata = {
  title: "Edit Product",
};

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = await getAdminProductById(id);

  if (!product) notFound();

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
          <p className="text-primary font-semibold text-sm mb-1">Products</p>
          <h1 className="text-2xl font-black text-neutral">Edit Product</h1>
        </div>
      </div>

      {/* ── Pass product to prefill form ── */}
      <ProductForm product={product} />
    </div>
  );
}
