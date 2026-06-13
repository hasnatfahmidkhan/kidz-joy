import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/db/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const orderId = req.nextUrl.searchParams.get("orderId");

  if (orderId) {
    const ordersCol = await dbConnect(collections.ORDERS);
    await ordersCol.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { "payment.status": "failed", updatedAt: new Date() } }
    );
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/order-failed`
  );
}