"use server";
import { dbConnect } from "@/lib/db/dbConnect";
import { ObjectId } from "mongodb";

export const getProductById = async (id) => {
  try {
    const db = await dbConnect("products");
    const result = await db.findOne({ _id: new ObjectId(id) });
    
    if (!result) return null;

    return {
      ...result,
      _id: result._id.toString(),
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};