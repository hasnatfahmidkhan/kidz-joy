"use client";

import { FiShoppingBag } from "react-icons/fi";

const PlaceOrderButton = ({ isLoading, paymentMethod }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="btn btn-primary w-full rounded-2xl h-14 font-black text-base gap-2 shadow-lg shadow-primary/20"
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner loading-sm" />
          Placing Order...
        </>
      ) : (
        <>
          <FiShoppingBag size={20} />
          {paymentMethod === "cod"
            ? "Place Order (Cash on Delivery)"
            : `Pay with ${paymentMethod === "bkash" ? "bKash" : "Nagad"}`}
        </>
      )}
    </button>
  );
};

export default PlaceOrderButton;
