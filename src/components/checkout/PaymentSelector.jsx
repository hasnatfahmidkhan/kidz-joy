"use client";

import { useState } from "react";
import { FaTruck } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import Image from "next/image";

const methods = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: <FaTruck size={22} className="text-success" />,
    badge: "Most Popular",
    badgeColor: "badge-success",
  },
  {
    id: "bkash",
    label: "bKash",
    description: "Pay via bKash mobile banking",
    icon: <FaMoneyBillWave size={22} className="text-pink-600" />,
    badge: null,
    badgeColor: null,
  },
  {
    id: "nagad",
    label: "Nagad",
    description: "Pay via Nagad mobile banking",
    // we use a text label since no react-icon for Nagad
    icon: <span className="text-orange-500 font-black text-sm">Nagad</span>,
    badge: null,
    badgeColor: null,
  },
];

const PaymentSelector = ({ onMethodChange }) => {
  const [selected, setSelected] = useState("cod");

  const handleSelect = (id) => {
    setSelected(id);
    onMethodChange(id);
  };

  return (
    <div className="bg-base-100 border border-base-200 rounded-2xl p-6">
      {/* ── Title ── */}
      <h2 className="font-black text-neutral text-lg mb-5">Payment Method</h2>

      {/* ── Method Cards ── */}
      <div className="space-y-3">
        {methods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => handleSelect(method.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-150 text-left
              ${
                selected === method.id
                  ? "border-primary bg-primary/5"
                  : "border-base-200 hover:border-base-300 bg-base-100"
              }`}
          >
            {/* Radio dot */}
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                ${
                  selected === method.id ? "border-primary" : "border-base-300"
                }`}
            >
              {selected === method.id && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              )}
            </div>

            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center shrink-0">
              {method.icon}
            </div>

            {/* Label + description */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-bold text-neutral text-sm">{method.label}</p>
                {method.badge && (
                  <span
                    className={`badge ${method.badgeColor} badge-sm text-white border-none font-bold`}
                  >
                    {method.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral/50 mt-0.5">
                {method.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* ── bKash / Nagad instruction ── */}
      {(selected === "bkash" || selected === "nagad") && (
        <div className="mt-4 bg-base-200/60 border border-base-300 rounded-2xl p-4 space-y-1.5">
          <p className="text-sm font-black text-neutral">
            {selected === "bkash" ? "bKash" : "Nagad"} Payment Instructions
          </p>
          <p className="text-xs text-neutral/60 leading-relaxed">
            After placing your order you will be redirected to the secure{" "}
            {selected === "bkash" ? "bKash" : "Nagad"} payment page. Complete
            your payment there to confirm your order.
          </p>
          <p className="text-xs font-bold text-primary">
            Powered by SSL Commerz 🔒
          </p>
        </div>
      )}

      {/* ── COD note ── */}
      {selected === "cod" && (
        <div className="mt-4 bg-success/5 border border-success/20 rounded-2xl p-4">
          <p className="text-xs text-success font-bold leading-relaxed">
            ✅ Pay in cash when your order is delivered to your door. No advance
            payment needed.
          </p>
        </div>
      )}

      {/* Hidden input — carries payment method to parent form */}
      <input type="hidden" name="paymentMethod" value={selected} />
    </div>
  );
};

export default PaymentSelector;
