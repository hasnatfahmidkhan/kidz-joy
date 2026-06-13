import Link from "next/link";
import {
  FiAlertCircle,
  FiShoppingCart,
  FiShoppingBag,
  FiArrowLeft,
} from "react-icons/fi";

export const metadata = {
  title: "Payment Cancelled",
  description: "You cancelled the payment.",
};

export default function PaymentCancelledPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 text-center">
      {/* ── Icon ── */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-warning/10 rounded-full flex items-center justify-center">
          <FiAlertCircle size={52} className="text-warning" />
        </div>
      </div>

      {/* ── Heading ── */}
      <h1 className="text-3xl font-black text-neutral mb-2">
        Payment Cancelled
      </h1>
      <p className="text-neutral/60 text-sm max-w-sm mx-auto leading-relaxed mb-8">
        You cancelled the payment. No worries — your cart is still saved. You
        can go back and complete your order whenever you&apos;re ready.
      </p>

      {/* ── Info card ── */}
      <div className="bg-warning/5 border border-warning/20 rounded-2xl p-5 mb-8 text-left space-y-2">
        <p className="text-sm font-black text-warning">📌 Good to know:</p>
        <ul className="space-y-1.5">
          {[
            "No payment was deducted from your account.",
            "Your cart items are still saved.",
            "You can complete your order anytime.",
            "Try Cash on Delivery if online payment isn't working.",
          ].map((note) => (
            <li
              key={note}
              className="flex items-start gap-2 text-xs text-neutral/60"
            >
              <span className="text-warning mt-0.5 shrink-0">✓</span>
              {note}
            </li>
          ))}
        </ul>
      </div>

      {/* ── CTAs ── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/checkout"
          className="btn btn-primary rounded-2xl px-8 gap-2 w-full sm:w-auto"
        >
          <FiArrowLeft size={17} />
          Back to Checkout
        </Link>
        <Link
          href="/cart"
          className="btn btn-outline border-base-300 rounded-2xl px-8 gap-2 w-full sm:w-auto"
        >
          <FiShoppingCart size={17} />
          View Cart
        </Link>
        <Link
          href="/shop"
          className="btn btn-ghost rounded-2xl px-8 gap-2 w-full sm:w-auto text-neutral/60"
        >
          <FiShoppingBag size={17} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
