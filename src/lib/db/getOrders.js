"use server";

import { getServerSession } from "next-auth";
import { collections, dbConnect } from "./dbConnect";
import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/auth/authOptions";

// ── Get all orders for logged-in user ──
export const getMyOrders = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return [];

  const db = await dbConnect(collections.ORDERS);

  const orders = await db
    .find({ userEmail: session.user.email })
    .sort({ createdAt: -1 })
    .project({
      _id: 1,
      orderId: 1,
      status: 1,
      createdAt: 1,
      items: 1,
      pricing: 1,
      payment: 1,
      delivery: 1,
    })
    .toArray();

  return orders.map((o) => ({
    ...o,
    _id: o._id.toString(),
  }));
};

// ── Get single order by ID ──
export const getOrderById = async (id) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  try {
    const db = await dbConnect(collections.ORDERS);
    const order = await db.findOne({
      _id: new ObjectId(id),
      userEmail: session.user.email, // security: only their own order
    });

    if (!order) return null;

    return { ...order, _id: order._id.toString() };
  } catch {
    return null;
  }
};
