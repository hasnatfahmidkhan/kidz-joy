"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/action/server/placeOrder";
import DeliveryForm from "./DeliveryForm";
import PaymentSelector from "./PaymentSelector";
import OrderSummary from "./OrderSummary";
import PlaceOrderButton from "./PlaceOrderButton";
import toast from "react-hot-toast";

const CheckoutClient = () => {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [shippingCost, setShippingCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isLoading, setIsLoading] = useState(false);

  // ── Guard: empty cart ──
  if (cart.length === 0) {
    router.replace("/cart");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;

    // ── Build delivery object from form ──
    const delivery = {
      name: form.name.value,
      phone: form.phone.value,
      address: form.address.value,
      district: form.district.value,
      area: form.area.value,
      postalCode: form.postalCode.value,
      notes: form.notes.value,
    };

    // ── Basic client validation ──
    if (!delivery.district) {
      toast.error("Please select your district.");
      setIsLoading(false);
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      setIsLoading(false);
      return;
    }

    // ── Call server action ──
    const result = await placeOrder({
      delivery,
      paymentMethod,
      cartItems: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });

    if (!result?.ok) {
      toast.error(result?.message || "Failed to place order.");
      setIsLoading(false);
      return;
    }

    // ── Success ──
    clearCart(); // clear localStorage cart

    if (result.method === "cod") {
      // COD → go to success page
      toast.success("Order placed successfully! 🎉");
      router.push(`/order-success/${result.orderId}`);
    } else {
      // SSL Commerz → redirect to payment gateway
      window.location.href = result.gatewayUrl;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* ── LEFT: Forms ── */}
        <div className="flex-1 min-w-0 space-y-5">
          <DeliveryForm onDistrictChange={(cost) => setShippingCost(cost)} />
          <PaymentSelector
            onMethodChange={(method) => setPaymentMethod(method)}
          />

          {/* Place Order Button — visible only on mobile here */}
          <div className="lg:hidden">
            <PlaceOrderButton
              isLoading={isLoading}
              paymentMethod={paymentMethod}
            />
          </div>
        </div>

        {/* ── RIGHT: Order Summary + Button ── */}
        <div className="w-full lg:w-80 shrink-0 space-y-4">
          <OrderSummary shippingCost={shippingCost} />

          {/* Place Order Button — desktop only here */}
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
