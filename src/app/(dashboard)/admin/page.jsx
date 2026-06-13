import { getAdminStats, getRecentOrders } from "@/lib/db/adminStats";
import Link from "next/link";
import {
  FiShoppingBag,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiPackage,
  FiXCircle,
  FiTrendingUp,
  FiArrowUpRight,
} from "react-icons/fi";

export const metadata = {
  title: "Admin Dashboard",
};

const statCards = [
  {
    label: "Total Orders",
    value: 0,
    icon: FiShoppingBag,
    color: "bg-primary/10 text-primary",
    trend: "",
  },
  {
    label: "Revenue",
    value: 0,
    icon: FiDollarSign,
    color: "bg-success/10 text-success",
    trend: "",
  },
  {
    label: "Pending",
    value: 0,
    icon: FiClock,
    color: "bg-warning/10 text-warning",
    trend: "Needs attention",
  },
  {
    label: "Delivered",
    value: 0,
    icon: FiCheckCircle,
    color: "bg-info/10 text-info",
    trend: "Completed",
  },
  {
    label: "Shipped",
    value: 0,
    icon: FiTruck,
    color: "bg-accent/10 text-accent",
    trend: "In transit",
  },
  {
    label: "Cancelled",
    value: 0,
    icon: FiXCircle,
    color: "bg-error/10 text-error",
    trend: "Refund needed?",
  },
];

const statusBadge = {
  pending: "badge-warning",
  confirmed: "badge-info",
  processing: "badge-info",
  shipped: "badge-primary",
  delivered: "badge-success",
  cancelled: "badge-error",
};

export default async function AdminDashboard() {
  const stats = await getAdminStats();
  const recent = await getRecentOrders(8);

  // Update stat cards with data
  statCards[0].value = stats.totalOrders;
  statCards[1].value = stats.totalRevenue;
  statCards[2].value = stats.pendingOrders;
  statCards[3].value = stats.deliveredOrders;
  statCards[4].value = stats.shippedOrders;
  statCards[5].value = stats.cancelledOrders;

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-primary font-semibold text-sm mb-1 flex items-center gap-1">
            <FiTrendingUp size={14} />
            Overview
          </p>
          <h1 className="text-2xl font-black text-neutral">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 text-primary text-sm font-bold px-4 py-2 rounded-xl">
          <FiPackage size={16} />
          {stats.todayOrders} orders today
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-base-100 border border-base-200 rounded-2xl p-4 hover:shadow-md transition-all duration-200"
            >
              <div
                className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}
              >
                <Icon size={18} />
              </div>
              <p className="text-xl font-black text-neutral">{card.value}</p>
              <p className="text-xs text-neutral/50 mt-0.5">{card.label}</p>
              {card.trend && (
                <p className="text-[10px] text-neutral/40 mt-1 flex items-center gap-1">
                  <FiArrowUpRight size={10} />
                  {card.trend}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Recent Orders ── */}
      <div className="bg-base-100 border border-base-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-base-200">
          <h2 className="font-black text-neutral flex items-center gap-2">
            <FiShoppingBag size={18} className="text-primary" />
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-primary text-sm font-bold hover:underline flex items-center gap-1"
          >
            View All <FiArrowUpRight size={14} />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="p-10 text-center text-neutral/50">
            <FiPackage size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-base-200/50 text-neutral/60 text-xs uppercase tracking-wider">
                  <th className="text-left p-4 font-bold">Order</th>
                  <th className="text-left p-4 font-bold">Customer</th>
                  <th className="text-left p-4 font-bold">Status</th>
                  <th className="text-right p-4 font-bold">Total</th>
                  <th className="text-right p-4 font-bold">Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t border-base-200 hover:bg-base-200/30 transition-colors"
                  >
                    <td className="p-4 font-bold text-neutral">
                      #{order.orderId}
                    </td>
                    <td className="p-4 text-neutral/70">
                      {order.delivery.name}
                    </td>
                    <td className="p-4">
                      <span
                        className={`badge ${statusBadge[order.status] || "badge-ghost"} text-white border-none badge-sm font-bold`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-bold text-neutral">
                      ৳{order.pricing.total}
                    </td>
                    <td className="p-4 text-right text-neutral/50 text-xs">
                      {new Date(order.createdAt).toLocaleDateString("en-BD", {
                        day: "numeric",
                        month: "short",
                      })}
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
