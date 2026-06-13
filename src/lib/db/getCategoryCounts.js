"use server";

import { collections, dbConnect } from "@/lib/db/dbConnect";

export const getCategoryCounts = async () => {
  const db = await dbConnect(collections.PRODUCTS);

  const result = await db
    .aggregate([
      // ── Group by category and count ──
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  // ── Convert to a simple object { educational: 12, puzzles: 5, ... } ──
  const counts = {};
  result.forEach((item) => {
    if (item._id) {
      counts[item._id] = item.count;
    }
  });

  return counts;
};
