"use server";

import { ObjectId } from "mongodb";
import { collections, dbConnect } from "./dbConnect";

export const getAdminStats = async () => {
  const db = await dbConnect(collections.ORDERS);

  const [
    totalOrders,
    totalRevenue,
    pendingOrders,
    confirmedOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    todayOrders,
  ] = await Promise.all([
    db.countDocuments(),
    db
      .aggregate([
        { $match: { "payment.status": "paid" } },
        { $group: { _id: null, total: { $sum: "$pricing.total" } } },
      ])
      .toArray(),
    db.countDocuments({ status: "pending" }),
    db.countDocuments({ status: "confirmed" }),
    db.countDocuments({ status: "shipped" }),
    db.countDocuments({ status: "delivered" }),
    db.countDocuments({ status: "cancelled" }),
    db.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    }),
  ]);

  return {
    totalOrders: totalOrders || 0,
    totalRevenue: totalRevenue[0]?.total || 0,
    pendingOrders: pendingOrders || 0,
    confirmedOrders: confirmedOrders || 0,
    shippedOrders: shippedOrders || 0,
    deliveredOrders: deliveredOrders || 0,
    cancelledOrders: cancelledOrders || 0,
    todayOrders: todayOrders || 0,
  };
};

export const getRecentOrders = async (limit = 10) => {
  const db = await dbConnect(collections.ORDERS);

  const orders = await db
    .find()
    .sort({ createdAt: -1 })
    .project({
      _id: 1,
      orderId: 1,
      status: 1,
      pricing: 1,
      delivery: 1,
      createdAt: 1,
    })
    .limit(limit)
    .toArray();

  return orders.map((o) => ({
    ...o,
    _id: o._id.toString(),
  }));
};
