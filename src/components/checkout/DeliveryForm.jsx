"use client";

import { districts, getShippingCost } from "@/lib/data/districts";
import { FiUser, FiPhone, FiMapPin, FiMap, FiFileText } from "react-icons/fi";

const DeliveryForm = ({ onDistrictChange }) => {
  return (
    <div className="bg-base-100 border border-base-200 rounded-2xl p-6">

      {/* ── Section Title ── */}
      <h2 className="font-black text-neutral text-lg mb-5 flex items-center gap-2">
        <FiMapPin className="text-primary" />
        Delivery Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Full Name */}
        <div className="form-control sm:col-span-2">
          <label className="label pb-1">
            <span className="label-text font-bold text-neutral/70 text-sm">
              Full Name *
            </span>
          </label>
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" />
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              required
              className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="form-control sm:col-span-2">
          <label className="label pb-1">
            <span className="label-text font-bold text-neutral/70 text-sm">
              Phone Number *
            </span>
          </label>
          <div className="relative">
            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" />
            <input
              type="tel"
              name="phone"
              placeholder="01XXXXXXXXX"
              required
              maxLength={11}
              className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-primary"
            />
          </div>
          <label className="label pt-1">
            <span className="label-text-alt text-neutral/40">
              Bangladesh number only (01XXXXXXXXX)
            </span>
          </label>
        </div>

        {/* District */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-bold text-neutral/70 text-sm">
              District *
            </span>
          </label>
          <select
            name="district"
            required
            defaultValue=""
            onChange={(e) => {
              const cost = getShippingCost(e.target.value);
              onDistrictChange(cost); // tell parent to update shipping
            }}
            className="select select-bordered w-full rounded-2xl focus:outline-none focus:border-primary"
          >
            <option value="" disabled>
              Select district
            </option>
            {districts.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name} — {d.division}
              </option>
            ))}
          </select>
        </div>

        {/* Area / Thana */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-bold text-neutral/70 text-sm">
              Area / Thana
            </span>
          </label>
          <div className="relative">
            <FiMap className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" />
            <input
              type="text"
              name="area"
              placeholder="Mirpur, Dhanmondi..."
              className="input input-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Full Address */}
        <div className="form-control sm:col-span-2">
          <label className="label pb-1">
            <span className="label-text font-bold text-neutral/70 text-sm">
              Full Address *
            </span>
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-4 top-4 text-neutral/40" />
            <textarea
              name="address"
              placeholder="House no, Road no, Area..."
              rows={2}
              required
              className="textarea textarea-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-primary resize-none"
            />
          </div>
        </div>

        {/* Postal Code */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-bold text-neutral/70 text-sm">
              Postal Code
            </span>
          </label>
          <input
            type="text"
            name="postalCode"
            placeholder="e.g. 1216"
            maxLength={4}
            className="input input-bordered w-full rounded-2xl focus:outline-none focus:border-primary"
          />
        </div>

        {/* Order Notes */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text font-bold text-neutral/70 text-sm">
              Order Notes
            </span>
          </label>
          <div className="relative">
            <FiFileText className="absolute left-4 top-3.5 text-neutral/40" />
            <textarea
              name="notes"
              placeholder="Any special instructions..."
              rows={2}
              className="textarea textarea-bordered w-full pl-11 rounded-2xl focus:outline-none focus:border-primary resize-none"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DeliveryForm;