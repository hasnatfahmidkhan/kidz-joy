"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { collections, dbConnect } from "@/lib/db/dbConnect";
import { ObjectId } from "mongodb";

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    // ── 1. Server-side auth check ──
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return { ok: false, message: "Unauthorized. Please login first." };
    }

    // ── 2. Only admin can update order status ──
    // You can add role checking here if you have a roles field
    // For now, just checking if user is authenticated
    // Add admin check based on your auth structure

    // ── 3. Validate orderId and newStatus ──
    if (!orderId || !newStatus) {
      return { ok: false, message: "Invalid order ID or status." };
    }

    const validStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(newStatus)) {
      return { ok: false, message: "Invalid status value." };
    }

    // ── 4. Update status in database ──
    const db = await dbConnect(collections.ORDERS);

    const result = await db.updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          status: newStatus,
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return { ok: false, message: "Order not found." };
    }

    return {
      ok: true,
      message: `Order status updated to ${newStatus}.`,
    };
  } catch (err) {
    console.error("updateOrderStatus error:", err);
    return { ok: false, message: "Something went wrong." };
  }
};
