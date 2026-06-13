import { getMyOrders } from "@/lib/db/getOrders";
import Link from "next/link";
import { FiShoppingBag, FiChevronRight, FiPackage } from "react-icons/fi";

export const metadata = {
  title: "My Orders",
};

// ── Status badge styles ──
const statusStyle = {
  pending: "badge-warning",
  confirmed: "badge-info",
  processing: "badge-info",
  shipped: "badge-primary",
  delivered: "badge-success",
  cancelled: "badge-error",
};

const statusLabel = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default async function MyOrdersPage() {
  const orders = await getMyOrders();

  return (
    <div>
      {/* ── Header ── */}
      <div className="mb-6">
        <p className="text-primary font-semibold text-sm mb-1">
          Your purchases
        </p>
        <h1 className="text-2xl font-black text-neutral">My Orders</h1>
      </div>

      {/* ── Empty ── */}
      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center bg-base-100 border border-base-200 rounded-2xl">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <FiPackage size={30} className="text-primary/40" />
          </div>
          <div>
            <h3 className="font-black text-neutral text-lg">No orders yet</h3>
            <p className="text-neutral/50 text-sm mt-1">
              Looks like you haven&apos;t placed any orders.
            </p>
          </div>
          <Link
            href="/shop"
            className="btn btn-primary rounded-2xl px-8 gap-2 mt-2"
          >
            <FiShoppingBag size={17} />
            Start Shopping
          </Link>
        </div>
      )}

      {/* ── Orders List ── */}
      {orders.length > 0 && (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/orders/${order._id}`}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-base-100 border border-base-200 hover:border-primary/30 hover:shadow-md rounded-2xl p-5 transition-all duration-200"
            >
              {/* ── Left: Order info ── */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-neutral text-sm">
                    #{order.orderId}
                  </span>
                  <span
                    className={`badge ${statusStyle[order.status] || "badge-ghost"} text-white border-none badge-sm font-bold`}
                  >
                    {statusLabel[order.status] || order.status}
                  </span>
                  {order.payment.status === "paid" && (
                    <span className="badge badge-success text-white border-none badge-sm font-bold">
                      Paid
                    </span>
                  )}
                </div>

                {/* Items summary */}
                <p className="text-xs text-neutral/60">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                  {" — "}
                  {order.items
                    .slice(0, 2)
                    .map((i) => i.title)
                    .join(", ")}
                  {order.items.length > 2 && ` +${order.items.length - 2} more`}
                </p>

                {/* Date */}
                <p className="text-[11px] text-neutral/40">
                  {new Date(order.createdAt).toLocaleDateString("en-BD", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* ── Right: Price + Arrow ── */}
              <div className="flex items-center gap-4 sm:shrink-0">
                <div className="text-right">
                  <p className="font-black text-primary text-lg">
                    ৳{order.pricing.total}
                  </p>
                  <p className="text-xs text-neutral/40 capitalize">
                    {order.payment.method === "cod"
                      ? "Cash on Delivery"
                      : order.payment.method}
                  </p>
                </div>
                <FiChevronRight
                  size={18}
                  className="text-neutral/30 group-hover:text-primary transition-colors"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
