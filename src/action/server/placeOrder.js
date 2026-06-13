"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { dbConnect, collections } from "@/lib/db/dbConnect";
import { ObjectId } from "mongodb";
import { getShippingCost } from "@/lib/data/districts";
import SSLCommerz from "sslcommerz-lts";

// ── SSL Commerz config ──
const SSL_STORE_ID = process.env.SSL_STORE_ID;
const SSL_STORE_PASSWORD = process.env.SSL_STORE_PASSWORD;
const IS_LIVE = false; // true in production

// ── Generate human-readable order ID ──
const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `KJ-${timestamp}-${random}`;
};

export const placeOrder = async ({ delivery, paymentMethod, cartItems }) => {
  try {
    // ── 1. Server auth check (NEVER skip this) ──
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { ok: false, message: "Unauthorized. Please login first." };
    }

    // ── 2. Validate delivery fields ──
    const { name, phone, address, district, area, postalCode, notes } =
      delivery;

    if (!name || name.trim().length < 2)
      return { ok: false, message: "Please enter a valid name." };
    if (!phone || !/^01[3-9]\d{8}$/.test(phone))
      return { ok: false, message: "Please enter a valid BD phone number." };
    if (!address || address.trim().length < 5)
      return { ok: false, message: "Please enter a valid address." };
    if (!district) return { ok: false, message: "Please select a district." };

    // ── 3. Re-fetch product prices from DB ──
    // NEVER trust prices sent from client — user can manipulate them
    const db = await dbConnect(collections.PRODUCTS);
    const productIds = cartItems.map((item) => new ObjectId(item.productId));

    const dbProducts = await db
      .find({ _id: { $in: productIds } })
      .project({ _id: 1, title: 1, price: 1, discount: 1, image: 1 })
      .toArray();

    // ── 4. Build verified order items using DB prices ──
    const verifiedItems = cartItems.map((cartItem) => {
      const dbProduct = dbProducts.find(
        (p) => p._id.toString() === cartItem.productId,
      );

      if (!dbProduct)
        throw new Error(`Product not found: ${cartItem.productId}`);

      // Use DB price — not what client sent
      const finalPrice =
        dbProduct.discount > 0
          ? Math.round(
              dbProduct.price - (dbProduct.price * dbProduct.discount) / 100,
            )
          : dbProduct.price;

      return {
        productId: dbProduct._id.toString(),
        title: dbProduct.title,
        image: dbProduct.image,
        price: dbProduct.price, // original
        discount: dbProduct.discount,
        finalPrice, // discounted
        quantity: cartItem.quantity,
        subtotal: finalPrice * cartItem.quantity,
      };
    });

    // ── 5. Calculate totals on server ──
    const subtotal = verifiedItems.reduce((acc, i) => acc + i.subtotal, 0);
    const shippingCost = getShippingCost(district);
    const total = subtotal + shippingCost;
    const orderId = generateOrderId();

    // ── 6. Apply coupon discount if provided ──
    let couponDiscount = 0;
    let couponData = null;

    if (coupon?.code) {
      // Re-validate on server (never trust client)
      const validation = await validateCoupon(coupon.code);
      if (validation.ok) {
        couponDiscount = Math.round(
          (subtotal * validation.discountPercent) / 100,
        );
        couponData = {
          code: coupon.code,
          discountPercent: validation.discountPercent,
          discountAmount: couponDiscount,
        };
      }
    }

    // ── 7. Build order document ──
    const order = {
      orderId,
      userEmail: session.user.email,
      userName: session.user.name || name,
      items: verifiedItems,
      delivery: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        district,
        area: area?.trim() || "",
        postalCode: postalCode?.trim() || "",
        notes: notes?.trim() || "",
      },
      payment: {
        method: paymentMethod, // "cod" | "bkash" | "nagad"
        status: "pending",
        transactionId: "",
      },
      pricing: {
        subtotal,
        shippingCost,
        total,
      },
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // ── 7. Save order to DB ──
    const ordersCol = await dbConnect(collections.ORDERS);
    const result = await ordersCol.insertOne(order);

    if (!result.acknowledged) {
      return {
        ok: false,
        message: "Failed to create order. Please try again.",
      };
    }

    const insertedId = result.insertedId.toString();

    // ── 8. COD → go straight to success page ──
    if (paymentMethod === "cod") {
      return {
        ok: true,
        method: "cod",
        orderId: insertedId,
      };
    }

    // ── 9. bKash / Nagad → SSL Commerz payment ──
    const sslData = {
      total_amount: total,
      currency: "BDT",
      tran_id: orderId, // unique transaction ID
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success?orderId=${insertedId}`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/fail?orderId=${insertedId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel?orderId=${insertedId}`,
      ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/ipn`,
      shipping_method: "Courier",
      product_name: "Kids Toys",
      product_category: "Toys",
      product_profile: "general",
      // customer info
      cus_name: name,
      cus_email: session.user.email,
      cus_add1: address,
      cus_city: district,
      cus_postcode: postalCode || "1000",
      cus_country: "Bangladesh",
      cus_phone: phone,
      // shipping info
      ship_name: name,
      ship_add1: address,
      ship_city: district,
      ship_postcode: postalCode || "1000",
      ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerz(SSL_STORE_ID, SSL_STORE_PASSWORD, IS_LIVE);
    const apiResponse = await sslcz.init(sslData);

    if (apiResponse?.GatewayPageURL) {
      return {
        ok: true,
        method: "ssl",
        gatewayUrl: apiResponse.GatewayPageURL, // redirect user here
        orderId: insertedId,
      };
    }

    return { ok: false, message: "Payment gateway error. Please try again." };
  } catch (err) {
    console.error("placeOrder error:", err);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
};
