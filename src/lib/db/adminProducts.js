"use server";

import { collections, dbConnect } from "@/lib/db/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { revalidatePath } from "next/cache";

// ── Admin guard helper ──
const isAdmin = async () => {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "admin";
};

// ── Get all products for admin table ──
export const getAdminProducts = async () => {
  if (!(await isAdmin())) return [];

  const db = dbConnect(collections.PRODUCTS);

  const products = await db
    .find()
    .sort({ createdAt: -1 })
    .project({
      _id: 1,
      title: 1,
      category: 1,
      price: 1,
      discount: 1,
      sold: 1,
      ratings: 1,
      featured: 1,
      image: 1,
    })
    .toArray();

  return products.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));
};

// ── Get single product for edit form ──
export const getAdminProductById = async (id) => {
  if (!(await isAdmin())) return null;

  const db = dbConnect(collections.PRODUCTS);
  const product = await db.findOne({ _id: new ObjectId(id) });
  if (!product) return null;

  return { ...product, _id: product._id.toString() };
};

// ── Add new product ──
export const addProduct = async (payload) => {
  if (!(await isAdmin())) return { ok: false, message: "Unauthorized." };

  try {
    const db = dbConnect(collections.PRODUCTS);

    const newProduct = {
      ...payload,
      price: Number(payload.price),
      discount: Number(payload.discount || 0),
      ratings: 0,
      reviews: 0,
      sold: 0,
      featured: payload.featured === true || payload.featured === "true",
      sizes: payload.sizes || [],
      color: payload.color || [],
      qna: payload.qna || [],
      info: payload.info || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.insertOne(newProduct);
    if (!result.acknowledged)
      return { ok: false, message: "Failed to add product." };

    // ── Revalidate shop + home so new product appears ──
    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath("/admin/products");

    return { ok: true, message: "Product added successfully!" };
  } catch (err) {
    console.error("addProduct error:", err);
    return { ok: false, message: "Something went wrong." };
  }
};

// ── Update product ──
export const updateProduct = async (id, payload) => {
  if (!(await isAdmin())) return { ok: false, message: "Unauthorized." };

  try {
    const db = dbConnect(collections.PRODUCTS);

    const updated = {
      ...payload,
      price: Number(payload.price),
      discount: Number(payload.discount || 0),
      featured: payload.featured === true || payload.featured === "true",
      updatedAt: new Date(),
    };

    const result = await db.updateOne(
      { _id: new ObjectId(id) },
      { $set: updated },
    );

    if (!result.acknowledged)
      return { ok: false, message: "Failed to update product." };

    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath(`/products/${id}`);
    revalidatePath("/admin/products");

    return { ok: true, message: "Product updated successfully!" };
  } catch (err) {
    console.error("updateProduct error:", err);
    return { ok: false, message: "Something went wrong." };
  }
};

// ── Delete product ──
export const deleteProduct = async (id) => {
  if (!(await isAdmin())) return { ok: false, message: "Unauthorized." };

  try {
    const db = dbConnect(collections.PRODUCTS);
    const result = await db.deleteOne({ _id: new ObjectId(id) });

    if (!result.deletedCount)
      return { ok: false, message: "Product not found." };

    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath("/admin/products");

    return { ok: true, message: "Product deleted." };
  } catch (err) {
    console.error("deleteProduct error:", err);
    return { ok: false, message: "Something went wrong." };
  }
};
