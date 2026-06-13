import { collections, dbConnect } from "@/lib/db/dbConnect";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowLeft,
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";
import { MdOutlineLocalShipping } from "react-icons/md";
import OrderStatusUpdater from "@/components/admin/OrderStatusUpdater";

export const metadata = {
  title: "Order Details",
};

const statusOptions = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default async function AdminOrderPage({ params }) {
  const { id } = await params;

  const db = await dbConnect(collections.ORDERS);
  const order = await db.findOne({ _id: new ObjectId(id) });

  if (!order) notFound();

  const o = { ...order, _id: order._id.toString() };

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/orders"
          className="btn btn-ghost btn-sm btn-circle border border-base-200"
        >
          <FiArrowLeft size={16} />
        </Link>
        <div>
          <p className="text-primary font-semibold text-xs">
            Order #{o.orderId}
          </p>
          <h1 className="text-xl font-black text-neutral">Order Details</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── LEFT: Items + Delivery ── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Items */}
          <div className="bg-base-100 border border-base-200 rounded-2xl p-5">
            <p className="text-xs font-black text-neutral/40 uppercase tracking-widest mb-4">
              Items
            </p>
            <div className="space-y-4">
              {o.items.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-xl bg-base-200 overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-neutral text-sm line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-neutral/50">
                      ৳{item.finalPrice} × {item.quantity}
                    </p>
                    {item.discount > 0 && (
                      <span className="text-[10px] bg-error/10 text-error font-bold px-1.5 py-0.5 rounded-full">
                        -{item.discount}%
                      </span>
                    )}
                  </div>
                  <p className="font-black text-neutral text-sm shrink-0">
                    ৳{item.subtotal}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery */}
          <div className="bg-base-100 border border-base-200 rounded-2xl p-5">
            <p className="text-xs font-black text-neutral/40 uppercase tracking-widest mb-3">
              Delivery
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-neutral/50 text-xs">Name</p>
                <p className="font-bold text-neutral">{o.delivery.name}</p>
              </div>
              <div>
                <p className="text-neutral/50 text-xs">Phone</p>
                <p className="font-bold text-neutral">{o.delivery.phone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-neutral/50 text-xs">Address</p>
                <p className="font-bold text-neutral">{o.delivery.address}</p>
              </div>
              <div>
                <p className="text-neutral/50 text-xs">Area</p>
                <p className="font-bold text-neutral">
                  {o.delivery.area || "—"}
                </p>
              </div>
              <div>
                <p className="text-neutral/50 text-xs">District</p>
                <p className="font-bold text-neutral">{o.delivery.district}</p>
              </div>
              {o.delivery.postalCode && (
                <div>
                  <p className="text-neutral/50 text-xs">Postal Code</p>
                  <p className="font-bold text-neutral">
                    {o.delivery.postalCode}
                  </p>
                </div>
              )}
              <div className="col-span-2">
                <p className="text-neutral/50 text-xs">Notes</p>
                <p className="font-bold text-neutral text-xs">
                  {o.delivery.notes || "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Status + Pricing ── */}
        <div className="space-y-5">
          {/* Status Updater */}
          <div className="bg-base-100 border border-base-200 rounded-2xl p-5 space-y-4">
            <p className="text-xs font-black text-neutral/40 uppercase tracking-widest">
              Update Status
            </p>

            <OrderStatusUpdater orderId={o._id} initialStatus={o.status} />

            {/* Timeline */}
            <div className="pt-3 border-t border-base-200">
              <p className="text-xs font-black text-neutral/40 uppercase tracking-widest mb-3">
                Progress
              </p>
              {[
                "pending",
                "confirmed",
                "processing",
                "shipped",
                "delivered",
              ].map((step, i) => {
                const Icon =
                  step === "pending"
                    ? FiClock
                    : step === "confirmed"
                      ? FiCheckCircle
                      : step === "processing"
                        ? FiPackage
                        : step === "shipped"
                          ? FiTruck
                          : FiCheckCircle;

                const isDone = statusOptions.indexOf(o.status) >= i;
                const isCurrent = o.status === step;

                return (
                  <div key={step} className="flex items-center gap-2 py-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0
                          ${
                            isDone
                              ? "bg-primary text-white"
                              : "bg-base-200 text-neutral/30"
                          }
                          ${isCurrent ? "ring-2 ring-primary/30" : ""}
                        `}
                    >
                      <Icon size={10} />
                    </div>
                    <span
                      className={`text-xs font-bold capitalize
                          ${isDone ? "text-primary" : "text-neutral/30"}`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-base-100 border border-base-200 rounded-2xl p-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral/60">Subtotal</span>
              <span className="font-bold">৳{o.pricing.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral/60 flex items-center gap-1">
                <MdOutlineLocalShipping size={14} />
                Shipping
              </span>
              <span className="font-bold">৳{o.pricing.shippingCost}</span>
            </div>
            <div className="divider" />
            <div className="flex justify-between font-black text-base">
              <span>Total</span>
              <span className="text-primary">৳{o.pricing.total}</span>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-base-100 border border-base-200 rounded-2xl p-5 space-y-2 text-sm">
            <p className="text-xs font-black text-neutral/40 uppercase tracking-widest">
              Payment
            </p>
            <div className="flex justify-between">
              <span className="text-neutral/60">Method</span>
              <span className="font-bold capitalize">
                {o.payment.method === "cod" ? "COD" : o.payment.method}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral/60">Status</span>
              <span
                className={`font-bold capitalize
                  ${o.payment.status === "paid" ? "text-success" : "text-warning"}`}
              >
                {o.payment.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
