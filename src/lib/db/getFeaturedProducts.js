"use server";
import { dbConnect } from "./dbConnect";

export const getFeaturedProducts = async () => {
  const db = await dbConnect("products");

  const result = await db
    .aggregate([
      // 1 - filter only featured products
      {
        $match: { featured: true },
      },

      // 2 - only pick fields the card needs
      {
        $project: {
          _id: 1,
          title: 1,
          image: 1,
          price: 1,
          discount: 1,
          ratings: 1,
          reviews: 1,
          sold: 1,
        },
      },

      // 3 limit
      {
        $limit: 4,
      },
    ])
    .toArray();

  return result.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));
};
