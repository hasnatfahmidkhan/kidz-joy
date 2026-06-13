import Link from "next/link";
import {
  FiXCircle,
  FiShoppingBag,
  FiHeadphones,
  FiRefreshCw,
} from "react-icons/fi";

export const metadata = {
  title: "Payment Failed",
  description: "Your payment could not be processed.",
};

export default function OrderFailedPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 text-center">
      {/* ── Icon ── */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center">
          <FiXCircle size={52} className="text-error" />
        </div>
      </div>

      {/* ── Heading ── */}
      <h1 className="text-3xl font-black text-neutral mb-2">
        Payment Failed 😔
      </h1>
      <p className="text-neutral/60 text-sm max-w-sm mx-auto leading-relaxed mb-8">
        We couldn&apos;t process your payment. Don&apos;t worry — no money was
        deducted. Please try again or use a different payment method.
      </p>

      {/* ── Reason Card ── */}
      <div className="bg-error/5 border border-error/20 rounded-2xl p-5 text-left mb-6 space-y-3">
        <p className="text-sm font-black text-error">
          Common reasons for payment failure:
        </p>
        <ul className="space-y-2">
          {[
            "Insufficient balance in your bKash / Nagad account",
            "Transaction limit exceeded",
            "Wrong PIN entered too many times",
            "Session timed out on the payment page",
            "Network issue during payment",
          ].map((reason) => (
            <li
              key={reason}
              className="flex items-start gap-2 text-xs text-neutral/60"
            >
              <span className="text-error mt-0.5 shrink-0">•</span>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* ── What to do ── */}
      <div className="bg-base-200/60 border border-base-300 rounded-2xl p-5 text-left mb-8">
        <p className="text-sm font-black text-neutral mb-3">What can you do?</p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <FiRefreshCw size={13} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral">Try Again</p>
              <p className="text-xs text-neutral/50">
                Go back to checkout and try again with the same or different
                payment method.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <FiHeadphones size={13} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral">Contact Support</p>
              <p className="text-xs text-neutral/50">
                If money was deducted but order wasn&apos;t placed, contact us
                immediately.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTAs ── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/checkout"
          className="btn btn-primary rounded-2xl px-8 gap-2 w-full sm:w-auto"
        >
          <FiRefreshCw size={17} />
          Try Again
        </Link>
        <Link
          href="/contact"
          className="btn btn-outline border-base-300 rounded-2xl px-8 gap-2 w-full sm:w-auto"
        >
          <FiHeadphones size={17} />
          Contact Support
        </Link>
        <Link
          href="/shop"
          className="btn btn-ghost rounded-2xl px-8 gap-2 w-full sm:w-auto text-neutral/60"
        >
          <FiShoppingBag size={17} />
          Back to Shop
        </Link>
      </div>
    </div>
  );
}
