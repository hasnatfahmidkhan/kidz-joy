import { collections, dbConnect } from "@/lib/db/dbConnect";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { FiShoppingBag, FiSearch, FiFilter } from "react-icons/fi";

export const metadata = {
  title: "Manage Orders",
};

const statusBadge = {
  pending: "badge-warning",
  confirmed: "badge-info",
  processing: "badge-info",
  shipped: "badge-primary",
  delivered: "badge-success",
  cancelled: "badge-error",
};

export default async function AdminOrdersPage({ searchParams }) {
  const db = await dbConnect(collections.ORDERS);

  const statusFilter = searchParams?.status || "";
  const query = statusFilter ? { status: statusFilter } : {};

  const orders = await db
    .find(query)
    .sort({ createdAt: -1 })
    .project({
      _id: 1,
      orderId: 1,
      status: 1,
      pricing: 1,
      delivery: 1,
      createdAt: 1,
    })
    .toArray();

  const allStatuses = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-primary font-semibold text-sm mb-1">
            Store orders
          </p>
          <h1 className="text-2xl font-black text-neutral">Manage Orders</h1>
        </div>
        <div className="flex items-center gap-2 bg-base-100 border border-base-200 rounded-xl px-3 py-2">
          <FiFilter size={14} className="text-neutral/40" />
          <select
            defaultValue={statusFilter}
            className="bg-transparent text-sm font-bold text-neutral outline-none cursor-pointer"
          >
            <option value="">All Statuses</option>
            {allStatuses.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="flex flex-wrap gap-3 mb-6">
        {allStatuses.map((s) => {
          const count = orders.filter((o) => o.status === s).length;
          return (
            <Link
              key={s}
              href={`/admin/orders?status=${s}`}
              className={`badge ${statusBadge[s]} text-white border-none badge-sm font-bold px-3 py-1.5 gap-1.5`}
            >
              {s} ({count})
            </Link>
          );
        })}
      </div>

      {/* ── Table ── */}
      <div className="bg-base-100 border border-base-200 rounded-2xl overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-neutral/50">
            <FiShoppingBag size={36} className="mx-auto mb-3 opacity-30" />
            <p className="font-bold">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-base-200/50 text-neutral/60 text-xs uppercase tracking-wider">
                  <th className="text-left p-4 font-bold">Order</th>
                  <th className="text-left p-4 font-bold">Customer</th>
                  <th className="text-left p-4 font-bold">Items</th>
                  <th className="text-left p-4 font-bold">Payment</th>
                  <th className="text-left p-4 font-bold">Status</th>
                  <th className="text-right p-4 font-bold">Total</th>
                  <th className="text-right p-4 font-bold">Date</th>
                  <th className="text-center p-4 font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t border-base-200 hover:bg-base-200/30 transition-colors"
                  >
                    <td className="p-4 font-black text-neutral">
                      #{order.orderId}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-neutral text-xs">
                        {order.delivery.name}
                      </p>
                      <p className="text-neutral/50 text-[11px]">
                        {order.delivery.phone}
                      </p>
                    </td>
                    <td className="p-4 text-neutral/70 text-xs">
                      {order.items?.length} items
                    </td>
                    <td className="p-4">
                      <span className="text-xs capitalize font-bold">
                        {order.payment?.method === "cod"
                          ? "COD"
                          : order.payment?.method}
                      </span>
                      {order.payment?.status === "paid" && (
                        <span className="block text-[10px] text-success font-bold">
                          Paid
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`badge ${statusBadge[order.status] || "badge-ghost"} text-white border-none badge-sm font-bold`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-black text-neutral">
                      ৳{order.pricing.total}
                    </td>
                    <td className="p-4 text-right text-neutral/50 text-xs">
                      {new Date(order.createdAt).toLocaleDateString("en-BD", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="btn btn-ghost btn-sm btn-circle border border-base-300 hover:border-primary hover:text-primary"
                      >
                        <FiSearch size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
