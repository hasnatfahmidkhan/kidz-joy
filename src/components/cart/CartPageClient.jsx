"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiArrowLeft,
} from "react-icons/fi";
import { MdOutlineLocalShipping } from "react-icons/md";

const CartPageClient = () => {
  const {
    cart,
    cartCount,
    cartTotal,
    cartOriginalTotal,
    totalSavings,
    removeFromCart,
    updateQuantity,
    clearCart,
    mounted,
  } = useCart();

  // ── Empty Cart ──
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <FiShoppingBag size={42} className="text-primary/40" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-neutral mb-2">
              Your cart is empty!
            </h2>
            <p className="text-neutral/50 text-sm">
              Looks like you haven&apos;t added any toys yet.
            </p>
          </div>
          <Link
            href="/shop"
            className="btn btn-primary rounded-2xl px-8 gap-2 mt-2"
          >
            <FiShoppingBag size={18} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-primary font-semibold text-sm mb-1">My Cart</p>
          <h1 className="text-3xl font-black text-neutral">
            {cartCount} {cartCount === 1 ? "Item" : "Items"}
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="btn btn-ghost btn-sm text-error gap-2 rounded-xl"
        >
          <FiTrash2 size={15} />
          Clear All
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* ── LEFT: Cart Items ── */}
        <div className="flex-1 min-w-0 space-y-4">
          {cart.map((item) => {
            const hasDiscount = item.discount > 0;
            const finalPrice = hasDiscount
              ? Math.round(item.price - (item.price * item.discount) / 100)
              : item.price;
            const itemTotal = finalPrice * item.quantity;

            return (
              <div
                key={item.productId}
                className="flex gap-4 bg-base-100 border border-base-200 rounded-2xl p-4 hover:shadow-md transition-all duration-200"
              >
                {/* Image */}
                <Link
                  href={`/products/${item.productId}`}
                  className="shrink-0 relative w-24 h-24 sm:w-28 sm:h-28 bg-base-200 rounded-xl overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                  />
                </Link>

                {/* Info */}
                <div className="flex flex-col flex-1 min-w-0 gap-1.5">
                  {/* Category */}
                  <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                    {item.category}
                  </span>

                  {/* Title */}
                  <Link
                    href={`/products/${item.productId}`}
                    className="font-bold text-neutral text-sm leading-snug hover:text-primary transition-colors line-clamp-2"
                  >
                    {item.title}
                  </Link>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="font-black text-primary text-base">
                      ৳{finalPrice}
                    </span>
                    {hasDiscount && (
                      <span className="text-neutral/40 text-xs line-through">
                        ৳{item.price}
                      </span>
                    )}
                    {hasDiscount && (
                      <span className="text-xs bg-error/10 text-error font-bold px-1.5 py-0.5 rounded-full">
                        -{item.discount}%
                      </span>
                    )}
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex items-center justify-between mt-auto pt-1">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-base-300 rounded-xl overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-base-200 transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <FiMinus size={13} />
                      </button>
                      <span className="w-8 text-center text-sm font-black text-neutral">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-base-200 transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <FiPlus size={13} />
                      </button>
                    </div>

                    {/* Item total + Remove */}
                    <div className="flex items-center gap-3">
                      <span className="font-black text-neutral text-sm">
                        ৳{itemTotal}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-neutral/30 hover:text-error transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Continue Shopping */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all duration-200 mt-2"
          >
            <FiArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>

        {/* ── RIGHT: Order Summary ── */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-base-100 border border-base-200 rounded-2xl p-6 sticky top-24">
            <h2 className="font-black text-neutral text-lg mb-5">
              Order Summary
            </h2>

            <div className="space-y-3 mb-5">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral/60 font-medium">
                  Subtotal ({cartCount} items)
                </span>
                <span className="font-bold text-neutral">
                  ৳{cartOriginalTotal}
                </span>
              </div>

              {/* Savings */}
              {totalSavings > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-success font-medium">Savings</span>
                  <span className="font-bold text-success">
                    -৳{totalSavings}
                  </span>
                </div>
              )}

              {/* Shipping */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral/60 font-medium flex items-center gap-1.5">
                  <MdOutlineLocalShipping size={16} />
                  Shipping
                </span>
                <span className="font-bold text-success text-xs">
                  Calculated at checkout
                </span>
              </div>

              <div className="divider my-2" />

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="font-black text-neutral text-base">Total</span>
                <span className="font-black text-primary text-xl">
                  ৳{cartTotal}
                </span>
              </div>

              {/* Savings badge */}
              {totalSavings > 0 && (
                <div className="bg-success/10 text-success text-xs font-bold px-3 py-2 rounded-xl text-center">
                  🎉 You&apos;re saving ৳{totalSavings} on this order!
                </div>
              )}
            </div>

            {/* Checkout button */}
            <Link
              href="/checkout"
              className="btn btn-primary rounded-2xl w-full font-black h-12"
            >
              Proceed to Checkout
            </Link>

            {/* Trust */}
            <p className="text-center text-xs text-neutral/40 mt-4">
              🔒 Secure checkout — 7 day return policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageClient;
