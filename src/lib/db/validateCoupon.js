"use server";

import { collections, dbConnect } from "@/lib/db/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

// ── Static coupons (move to DB later if you want dynamic coupons) ──
const COUPONS = {
  KIDZ20: {
    code: "KIDZ20",
    discountPercent: 20,
    type: "first_order", // only valid on first order
    description: "20% off your first order",
  },
};

export const validateCoupon = async (code) => {
  try {
    // ── 1. Auth check ──
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { ok: false, message: "Please login first." };
    }

    // ── 2. Check code exists ──
    const coupon = COUPONS[code?.toUpperCase()?.trim()];
    if (!coupon) {
      return { ok: false, message: "Invalid coupon code." };
    }

    const ordersDb = await dbConnect(collections.ORDERS);

    // ── 3. Check first order rule ──
    if (coupon.type === "first_order") {
      const previousOrders = await ordersDb.countDocuments({
        userEmail: session.user.email,
        status: { $ne: "cancelled" }, // cancelled orders don't count
      });

      if (previousOrders > 0) {
        return {
          ok: false,
          message: "This code is only valid on your first order.",
        };
      }
    }

    // ── 4. Check already used ──
    const alreadyUsed = await ordersDb.findOne({
      userEmail: session.user.email,
      "coupon.code": code.toUpperCase().trim(),
    });

    if (alreadyUsed) {
      return {
        ok: false,
        message: "You have already used this coupon.",
      };
    }

    // ── 5. All checks passed ──
    return {
      ok: true,
      message: coupon.description,
      discountPercent: coupon.discountPercent,
      code: coupon.code,
    };
  } catch (err) {
    console.error("validateCoupon error:", err);
    return { ok: false, message: "Something went wrong." };
  }
};
