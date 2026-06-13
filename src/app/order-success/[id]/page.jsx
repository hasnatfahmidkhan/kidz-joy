import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import { dbConnect, collections } from "@/lib/db/dbConnect";
import { ObjectId } from "mongodb";
import Link from "next/link";
import {
  FiCheckCircle,
  FiPackage,
  FiHome,
  FiShoppingBag,
} from "react-icons/fi";
import { MdOutlineLocalShipping } from "react-icons/md";

export const metadata = {
  title: "Order Placed!",
  description: "Your order has been placed successfully.",
};

export default async function OrderSuccessPage({ params }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  // ── Fetch order ──
  let order = null;
  try {
    const ordersCol = await dbConnect(collections.ORDERS);
    const result = await ordersCol.findOne({ _id: new ObjectId(id) });

    if (result) {
      order = {
        ...result,
        _id: result._id.toString(),
      };
    }
  } catch {
    redirect("/");
  }

  if (!order) redirect("/");

  // ── Guard: wrong user ──
  if (session && order.userEmail !== session.user.email) {
    redirect("/");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 text-center">
      {/* ── Success Icon ── */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center">
          <FiCheckCircle size={52} className="text-success" />
        </div>
      </div>

      {/* ── Heading ── */}
      <h1 className="text-3xl font-black text-neutral mb-2">
        Order Placed! 🎉
      </h1>
      <p className="text-neutral/60 text-sm mb-1">
        Thank you, <span className="font-bold">{order.delivery.name}</span>!
      </p>
      <p className="text-neutral/60 text-sm mb-8">
        Your order{" "}
        <span className="font-black text-primary">#{order.orderId}</span> has
        been placed successfully.
      </p>

      {/* ── Order Details Card ── */}
      <div className="bg-base-100 border border-base-200 rounded-2xl p-6 text-left mb-6 space-y-4">
        {/* Order items */}
        <div>
          <p className="text-xs font-black text-neutral/40 uppercase tracking-widest mb-3">
            Items Ordered
          </p>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between text-sm"
              >
                <span className="text-neutral font-semibold line-clamp-1 flex-1">
                  {item.title}{" "}
                  <span className="text-neutral/40">× {item.quantity}</span>
                </span>
                <span className="font-bold text-neutral shrink-0 ml-2">
                  ৳{item.subtotal}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="divider my-2" />

        {/* Delivery */}
        <div>
          <p className="text-xs font-black text-neutral/40 uppercase tracking-widest mb-2">
            Delivery To
          </p>
          <p className="text-sm font-bold text-neutral">
            {order.delivery.name}
          </p>
          <p className="text-xs text-neutral/60">{order.delivery.phone}</p>
          <p className="text-xs text-neutral/60">
            {order.delivery.address}, {order.delivery.area},{" "}
            {order.delivery.district}
          </p>
        </div>

        <div className="divider my-2" />

        {/* Pricing */}
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral/60">Subtotal</span>
            <span className="font-bold">৳{order.pricing.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral/60 flex items-center gap-1">
              <MdOutlineLocalShipping />
              Shipping
            </span>
            <span className="font-bold">৳{order.pricing.shippingCost}</span>
          </div>
          <div className="flex justify-between font-black text-base mt-1 pt-1 border-t border-base-200">
            <span>Total</span>
            <span className="text-primary">৳{order.pricing.total}</span>
          </div>
        </div>

        <div className="divider my-2" />

        {/* Payment */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-neutral/40 uppercase tracking-widest">
              Payment
            </p>
            <p className="text-sm font-bold text-neutral capitalize mt-0.5">
              {order.payment.method === "cod"
                ? "Cash on Delivery"
                : order.payment.method}
            </p>
          </div>
          <div>
            <p className="text-xs font-black text-neutral/40 uppercase tracking-widest">
              Status
            </p>
            <span
              className={`badge font-bold border-none mt-0.5
              ${
                order.payment.status === "paid"
                  ? "badge-success text-white"
                  : "badge-warning text-white"
              }`}
            >
              {order.payment.status === "paid" ? "Paid" : "Pending"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Info Banner ── */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-8 text-sm text-primary font-semibold">
        <FiPackage className="inline mr-1.5" />
        We will process your order and update you via email at{" "}
        <span className="font-black">{order.userEmail}</span>
      </div>

      {/* ── CTAs ── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/"
          className="btn btn-outline border-base-300 rounded-2xl px-8 gap-2 w-full sm:w-auto"
        >
          <FiHome size={17} />
          Back to Home
        </Link>
        <Link
          href="/shop"
          className="btn btn-primary rounded-2xl px-8 gap-2 w-full sm:w-auto"
        >
          <FiShoppingBag size={17} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
