import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/db/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.formData();

    const orderId = req.nextUrl.searchParams.get("orderId");
    const transactionId = body.get("tran_id");
    const status = body.get("status");

    if (status !== "VALID") {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/order-failed`,
      );
    }

    // ── Update order in DB ──
    const ordersCol = await dbConnect(collections.ORDERS);
    await ordersCol.updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          status: "confirmed",
          "payment.status": "paid",
          "payment.transactionId": transactionId,
          updatedAt: new Date(),
        },
      },
    );

    // ── Redirect to success page ──
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/order-success/${orderId}`,
    );
  } catch (err) {
    console.error("Payment success error:", err);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/order-failed`,
    );
  }
}
