"use server";

import { dbConnect } from "@/lib/db/dbConnect";

// ── Generic reusable function ──
export const getProducts = async ({
  query = {},
  sort = {},
  limit = 4,
  skip = 0,
} = {}) => {
  const db = await dbConnect("products");

  const pipeline = [
    // 1 — filter
    { $match: query },

    // 2 — sort
    ...(Object.keys(sort).length > 0 ? [{ $sort: sort }] : []),

    // 3 — pagination
    ...(skip > 0 ? [{ $skip: skip }] : []),

    // 4 — limit
    { $limit: Number(limit) },

    // 5 — only fields ProductCard needs
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
        category: 1,
      },
    },
  ];

  const result = await db.aggregate(pipeline).toArray();

  return result.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));
};

// ── Named wrappers — clean & readable in components ──

export const getFeaturedProducts = async (limit = 4) =>
  getProducts({
    query: { featured: true },
    sort: { sold: -1 }, // most sold first
    limit,
  });

export const getNewArrivals = async (limit = 6) =>
  getProducts({
    query: {},
    sort: { createdAt: -1 }, // newest first using your new field
    limit,
  });
