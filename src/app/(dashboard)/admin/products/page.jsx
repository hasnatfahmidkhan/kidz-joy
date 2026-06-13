import Link from "next/link";
import Image from "next/image";
import { getAdminProducts } from "@/lib/db/adminProducts";
import { FiPlus, FiEdit2, FiPackage } from "react-icons/fi";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";

export const metadata = {
  title: "Manage Products",
};

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-primary font-semibold text-sm mb-1">
            Store inventory
          </p>
          <h1 className="text-2xl font-black text-neutral">Manage Products</h1>
        </div>
        <Link
          href="/admin/products/add"
          className="btn btn-primary rounded-2xl gap-2"
        >
          <FiPlus size={18} />
          Add Product
        </Link>
      </div>

      {/* ── Total count ── */}
      <p className="text-sm text-neutral/50 font-semibold mb-4">
        {products.length} products total
      </p>

      {/* ── Table ── */}
      <div className="bg-base-100 border border-base-200 rounded-2xl overflow-hidden">
        {products.length === 0 ? (
          <div className="p-14 text-center text-neutral/50">
            <FiPackage size={36} className="mx-auto mb-3 opacity-30" />
            <p className="font-bold">No products yet</p>
            <Link
              href="/admin/products/add"
              className="btn btn-primary rounded-2xl gap-2 mt-4 btn-sm"
            >
              <FiPlus size={15} />
              Add First Product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-base-200/50 text-neutral/60 text-xs uppercase tracking-wider">
                  <th className="text-left p-4 font-bold">Product</th>
                  <th className="text-left p-4 font-bold">Category</th>
                  <th className="text-right p-4 font-bold">Price</th>
                  <th className="text-center p-4 font-bold">Discount</th>
                  <th className="text-center p-4 font-bold">Sold</th>
                  <th className="text-center p-4 font-bold">Featured</th>
                  <th className="text-center p-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const finalPrice =
                    product.discount > 0
                      ? Math.round(
                          product.price -
                            (product.price * product.discount) / 100,
                        )
                      : product.price;

                  return (
                    <tr
                      key={product._id}
                      className="border-t border-base-200 hover:bg-base-200/30 transition-colors"
                    >
                      {/* Product info */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-base-200 shrink-0">
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <p className="font-bold text-neutral text-xs line-clamp-2 max-w-45">
                            {product.title}
                          </p>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="badge badge-ghost badge-sm capitalize font-bold">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="p-4 text-right">
                        <p className="font-black text-primary text-sm">
                          ৳{finalPrice}
                        </p>
                        {product.discount > 0 && (
                          <p className="text-neutral/40 text-xs line-through">
                            ৳{product.price}
                          </p>
                        )}
                      </td>

                      {/* Discount */}
                      <td className="p-4 text-center">
                        {product.discount > 0 ? (
                          <span className="badge badge-error text-white border-none badge-sm font-bold">
                            -{product.discount}%
                          </span>
                        ) : (
                          <span className="text-neutral/30 text-xs">—</span>
                        )}
                      </td>

                      {/* Sold */}
                      <td className="p-4 text-center">
                        <span className="text-xs font-bold text-neutral">
                          {product.sold}
                        </span>
                      </td>

                      {/* Featured */}
                      <td className="p-4 text-center">
                        {product.featured ? (
                          <span className="badge badge-success text-white border-none badge-sm font-bold">
                            Yes
                          </span>
                        ) : (
                          <span className="badge badge-ghost badge-sm">No</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/products/${product._id}`}
                            className="btn btn-ghost btn-sm btn-circle border border-base-300 hover:border-primary hover:text-primary"
                          >
                            <FiEdit2 size={13} />
                          </Link>
                          <AdminDeleteButton id={product._id} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
