import { getOrderById } from "@/lib/db/getOrders";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiArrowLeft,
} from "react-icons/fi";
import { MdOutlineLocalShipping } from "react-icons/md";

export const metadata = {
  title: "Order Details",
};

// ── Timeline steps ──
const timelineSteps = [
  { key: "pending", label: "Order Placed", icon: FiClock },
  { key: "confirmed", label: "Confirmed", icon: FiCheckCircle },
  { key: "processing", label: "Processing", icon: FiPackage },
  { key: "shipped", label: "Shipped", icon: FiTruck },
  { key: "delivered", label: "Delivered", icon: FiCheckCircle },
];

const statusOrder = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

const statusStyle = {
  pending: "badge-warning",
  confirmed: "badge-info",
  processing: "badge-info",
  shipped: "badge-primary",
  delivered: "badge-success",
  cancelled: "badge-error",
};

export default async function OrderDetailsPage({ params }) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) notFound();

  const currentStepIndex = statusOrder.indexOf(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center gap-4">
        <Link
          href="/orders"
          className="btn btn-ghost btn-sm btn-circle border border-base-200"
        >
          <FiArrowLeft size={16} />
        </Link>
        <div>
          <p className="text-primary font-semibold text-xs">Order Details</p>
          <h1 className="text-xl font-black text-neutral">#{order.orderId}</h1>
        </div>
        <span
          className={`badge ${statusStyle[order.status] || "badge-ghost"} text-white border-none font-bold ml-auto`}
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      {/* ── Timeline ── */}
      {!isCancelled && (
        <div className="bg-base-100 border border-base-200 rounded-2xl p-5">
          <p className="text-xs font-black text-neutral/40 uppercase tracking-widest mb-5">
            Order Progress
          </p>
          <div className="flex items-start justify-between relative">
            {/* Progress line */}
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-base-300 z-0" />
            <div
              className="absolute top-4 left-4 h-0.5 bg-primary z-0 transition-all duration-500"
              style={{
                width:
                  currentStepIndex <= 0
                    ? "0%"
                    : `${(currentStepIndex / (timelineSteps.length - 1)) * 100}%`,
              }}
            />

            {/* Steps */}
            {timelineSteps.map((step, i) => {
              const Icon = step.icon;
              const isDone = i <= currentStepIndex;
              const isCurrent = i === currentStepIndex;

              return (
                <div
                  key={step.key}
                  className="flex flex-col items-center gap-2 z-10 flex-1"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-200
                      ${
                        isDone
                          ? "bg-primary border-primary text-white"
                          : "bg-base-100 border-base-300 text-neutral/30"
                      }
                      ${isCurrent ? "ring-4 ring-primary/20" : ""}
                    `}
                  >
                    <Icon size={14} />
                  </div>
                  <span
                    className={`text-[10px] font-bold text-center leading-tight
                      ${isDone ? "text-primary" : "text-neutral/30"}`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Cancelled Banner ── */}
      {isCancelled && (
        <div className="bg-error/5 border border-error/20 rounded-2xl p-4 flex items-center gap-3">
          <FiXCircle size={20} className="text-error shrink-0" />
          <p className="text-sm font-bold text-error">
            This order was cancelled.
          </p>
        </div>
      )}

      {/* ── Items ── */}
      <div className="bg-base-100 border border-base-200 rounded-2xl p-5">
        <p className="text-xs font-black text-neutral/40 uppercase tracking-widest mb-4">
          Items Ordered
        </p>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex gap-4">
              {/* Image */}
              <Link
                href={`/products/${item.productId}`}
                className="relative w-16 h-16 rounded-xl bg-base-200 overflow-hidden shrink-0"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-2"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.productId}`}
                  className="font-bold text-neutral text-sm hover:text-primary transition-colors line-clamp-1"
                >
                  {item.title}
                </Link>
                <p className="text-xs text-neutral/50 mt-0.5">
                  ৳{item.finalPrice} × {item.quantity}
                </p>
                {item.discount > 0 && (
                  <span className="text-[10px] bg-error/10 text-error font-bold px-1.5 py-0.5 rounded-full">
                    -{item.discount}% off
                  </span>
                )}
              </div>

              {/* Subtotal */}
              <p className="font-black text-neutral text-sm shrink-0">
                ৳{item.subtotal}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Two column: Delivery + Payment ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Delivery */}
        <div className="bg-base-100 border border-base-200 rounded-2xl p-5">
          <p className="text-xs font-black text-neutral/40 uppercase tracking-widest mb-3">
            Delivery Address
          </p>
          <div className="space-y-1 text-sm">
            <p className="font-bold text-neutral">{order.delivery.name}</p>
            <p className="text-neutral/60">{order.delivery.phone}</p>
            <p className="text-neutral/60">{order.delivery.address}</p>
            <p className="text-neutral/60">
              {order.delivery.area && `${order.delivery.area}, `}
              {order.delivery.district}
            </p>
            {order.delivery.notes && (
              <p className="text-neutral/40 italic text-xs mt-2">
                Note: {order.delivery.notes}
              </p>
            )}
          </div>
        </div>

        {/* Payment */}
        <div className="bg-base-100 border border-base-200 rounded-2xl p-5">
          <p className="text-xs font-black text-neutral/40 uppercase tracking-widest mb-3">
            Payment Info
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral/60">Method</span>
              <span className="font-bold capitalize">
                {order.payment.method === "cod"
                  ? "Cash on Delivery"
                  : order.payment.method}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral/60">Status</span>
              <span
                className={`font-bold capitalize
                  ${
                    order.payment.status === "paid"
                      ? "text-success"
                      : "text-warning"
                  }`}
              >
                {order.payment.status}
              </span>
            </div>
            {order.payment.transactionId && (
              <div className="flex justify-between">
                <span className="text-neutral/60">Txn ID</span>
                <span className="font-bold text-xs">
                  {order.payment.transactionId}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Pricing Summary ── */}
      <div className="bg-base-100 border border-base-200 rounded-2xl p-5">
        <p className="text-xs font-black text-neutral/40 uppercase tracking-widest mb-3">
          Pricing
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral/60">Subtotal</span>
            <span className="font-bold">৳{order.pricing.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral/60 flex items-center gap-1.5">
              <MdOutlineLocalShipping />
              Shipping
            </span>
            <span className="font-bold">৳{order.pricing.shippingCost}</span>
          </div>
          <div className="divider my-1" />
          <div className="flex justify-between font-black text-base">
            <span>Total</span>
            <span className="text-primary">৳{order.pricing.total}</span>
          </div>
        </div>
      </div>

      {/* ── Placed date ── */}
      <p className="text-xs text-neutral/40 text-center">
        Order placed on{" "}
        {new Date(order.createdAt).toLocaleDateString("en-BD", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}
