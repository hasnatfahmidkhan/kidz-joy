"use server";
import { dbConnect } from "./dbConnect";

export const getFeaturedProducts = async () => {
  const result = (await dbConnect("products"))
    .find({ featured: true })
    .limit(4)
    .toArray();
  return result;
};
