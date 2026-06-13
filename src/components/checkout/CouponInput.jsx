"use client";

import { useState } from "react";
import { validateCoupon } from "@/lib/db/validateCoupon";
import toast from "react-hot-toast";
import { FiTag, FiX, FiCheck } from "react-icons/fi";

const CouponInput = ({ onApply, onRemove, appliedCoupon }) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) {
      toast.error("Please enter a coupon code.");
      return;
    }

    setIsLoading(true);
    const result = await validateCoupon(code);
    setIsLoading(false);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(`Coupon applied! ${result.message}`);
    onApply({
      code: result.code,
      discountPercent: result.discountPercent,
      message: result.message,
    });
    setCode("");
  };

  const handleRemove = () => {
    onRemove();
    setCode("");
    toast.success("Coupon removed.");
  };

  // ── Already applied ──
  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between bg-success/10 border border-success/30 rounded-2xl px-4 py-3">
        <div className="flex items-center gap-2">
          <FiCheck size={16} className="text-success" />
          <div>
            <p className="font-black text-success text-sm">
              {appliedCoupon.code}
            </p>
            <p className="text-success/70 text-xs">
              {appliedCoupon.discountPercent}% off applied!
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleRemove}
          className="text-success/60 hover:text-error transition-colors"
          aria-label="Remove coupon"
        >
          <FiX size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-black text-neutral/50 uppercase tracking-widest">
        Coupon Code
      </p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <FiTag
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral/40"
            size={15}
          />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder="Enter code (e.g. KIDZ20)"
            maxLength={20}
            className="input input-bordered input-sm w-full pl-9 rounded-xl focus:outline-none focus:border-primary text-sm font-bold tracking-widest"
          />
        </div>
        <button
          type="button"
          onClick={handleApply}
          disabled={isLoading || !code.trim()}
          className="btn btn-primary btn-sm rounded-xl px-5 font-bold"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            "Apply"
          )}
        </button>
      </div>
    </div>
  );
};

export default CouponInput;
