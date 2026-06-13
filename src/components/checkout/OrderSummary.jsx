"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { MdOutlineLocalShipping } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";

const OrderSummary = ({ shippingCost }) => {
  const { cart, cartTotal, cartOriginalTotal, totalSavings } = useCart();

  const grandTotal = cartTotal + shippingCost;

  return (
    <div className="bg-base-100 border border-base-200 rounded-2xl p-6 sticky top-24">

      {/* ── Title ── */}
      <h2 className="font-black text-neutral text-lg mb-5 flex items-center gap-2">
        <FiShoppingBag className="text-primary" />
        Order Summary
      </h2>

      {/* ── Items ── */}
      <div className="space-y-3 mb-5 max-h-52 overflow-y-auto pr-1">
        {cart.map((item) => {
          const finalPrice = item.discount > 0
            ? Math.round(item.price - (item.price * item.discount) / 100)
            : item.price;

          return (
            <div key={item.productId} className="flex gap-3">
              {/* Image */}
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-base-200 shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-1"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-neutral leading-snug line-clamp-1">
                  {item.title}
                </p>
                <p className="text-xs text-neutral/50 mt-0.5">
                  ৳{finalPrice} × {item.quantity}
                </p>
              </div>

              {/* Item total */}
              <p className="text-xs font-black text-neutral shrink-0">
                ৳{finalPrice * item.quantity}
              </p>
            </div>
          );
        })}
      </div>

      <div className="divider my-3" />

      {/* ── Price Breakdown ── */}
      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral/60">Subtotal</span>
          <span className="font-bold text-neutral">৳{cartOriginalTotal}</span>
        </div>

        {totalSavings > 0 && (
          <div className="flex justify-between">
            <span className="text-success">Discount Savings</span>
            <span className="font-bold text-success">-৳{totalSavings}</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-neutral/60 flex items-center gap-1.5">
            <MdOutlineLocalShipping size={16} />
            Shipping
          </span>
          {shippingCost === 0 ? (
            <span className="font-bold text-success text-xs">
              Select district
            </span>
          ) : (
            <span className="font-bold text-neutral">৳{shippingCost}</span>
          )}
        </div>

        {shippingCost > 0 && (
          <p className="text-[10px] text-neutral/40">
            {shippingCost === 60
              ? "📍 Dhaka delivery rate"
              : "📍 Outside Dhaka delivery rate"}
          </p>
        )}
      </div>

      <div className="divider my-3" />

      {/* ── Grand Total ── */}
      <div className="flex justify-between items-center mb-4">
        <span className="font-black text-neutral text-base">Total</span>
        <span className="font-black text-primary text-2xl">
          ৳{grandTotal}
        </span>
      </div>

      {/* ── Savings badge ── */}
      {totalSavings > 0 && (
        <div className="bg-success/10 text-success text-xs font-bold px-3 py-2 rounded-xl text-center mb-2">
          🎉 You&apos;re saving ৳{totalSavings} on this order!
        </div>
      )}

      {/* Trust */}
      <p className="text-center text-xs text-neutral/40 mt-3">
        🔒 Secure checkout — 7 day return policy
      </p>
    </div>
  );
};

export default OrderSummary;