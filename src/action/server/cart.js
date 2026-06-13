"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { placeOrder } from "./placeOrder";

export const addToCart = async (cartItem) => {
  try {
    // ── 1. Server-side auth check ──
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return { ok: false, message: "Unauthorized. Please login first." };
    }

    // ── 2. Make sure the email in cart item matches session ──
    // Prevents user A from adding to user B's cart
    if (cartItem.email !== session.user.email) {
      return { ok: false, message: "Forbidden." };
    }

    // ── 3. Validate required fields ──
    const { productId, email, title, image, price, discount, category } = cartItem;

    if (!productId || !email || !price) {
      return { ok: false, message: "Invalid cart item data." };
    }

    // ── 4. Add to cart ──
    // For now: localStorage handles UI cart
    // This function is ready for when you move cart to DB
    return { ok: true, message: "Added to cart." };

  } catch (err) {
    console.error("addToCart error:", err);
    return { ok: false, message: "Something went wrong." };
  }
};

