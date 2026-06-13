"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/action/server/placeOrder";
import DeliveryForm from "./DeliveryForm";
import PaymentSelector from "./PaymentSelector";
import OrderSummary from "./OrderSummary";
import PlaceOrderButton from "./PlaceOrderButton";
import CouponInput from "./CouponInput";
import toast from "react-hot-toast";

const CheckoutClient = () => {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [shippingCost, setShippingCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isLoading, setIsLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  if (cart.length === 0) {
    router.replace("/cart");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const delivery = {
      name: form.name.value,
      phone: form.phone.value,
      address: form.address.value,
      district: form.district.value,
      area: form.area.value,
      postalCode: form.postalCode.value,
      notes: form.notes.value,
    };

    if (!delivery.district) {
      toast.error("Please select your district.");
      setIsLoading(false);
      return;
    }

    const result = await placeOrder({
      delivery,
      paymentMethod,
      cartItems: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      // ── Pass coupon to server ──
      coupon: appliedCoupon || null,
    });

    if (!result?.ok) {
      toast.error(result?.message || "Failed to place order.");
      setIsLoading(false);
      return;
    }

    clearCart();

    if (result.method === "cod") {
      toast.success("Order placed successfully! 🎉");
      router.push(`/order-success/${result.orderId}`);
    } else {
      window.location.href = result.gatewayUrl;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* ── LEFT ── */}
        <div className="flex-1 min-w-0 space-y-5">
          <DeliveryForm onDistrictChange={setShippingCost} />

          {/* ── Coupon Input ── */}
          <div className="bg-base-100 border border-base-200 rounded-2xl p-6">
            <CouponInput
              appliedCoupon={appliedCoupon}
              onApply={setAppliedCoupon}
              onRemove={() => setAppliedCoupon(null)}
            />
          </div>

          <PaymentSelector onMethodChange={setPaymentMethod} />

          <div className="lg:hidden">
            <PlaceOrderButton
              isLoading={isLoading}
              paymentMethod={paymentMethod}
            />
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="w-full lg:w-80 shrink-0 space-y-4">
          <OrderSummary
            shippingCost={shippingCost}
            appliedCoupon={appliedCoupon}
          />
          <div className="hidden lg:block">
            <PlaceOrderButton
              isLoading={isLoading}
              paymentMethod={paymentMethod}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutClient;
