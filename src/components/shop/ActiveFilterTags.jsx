"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FiX } from "react-icons/fi";

const ActiveFilterTags = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const rating = searchParams.get("rating");
  const priceMin = searchParams.get("price_min");
  const priceMax = searchParams.get("price_max");
  const discount = searchParams.get("discount");
  const search = searchParams.get("search");

  const removeParam = (...keys) => {
    const params = new URLSearchParams(searchParams.toString());
    keys.forEach((k) => params.delete(k));
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tags = [
    category && {
      label: `Category: ${category}`,
      onRemove: () => removeParam("category"),
    },
    rating && {
      label: `Rating: ${rating}★ & above`,
      onRemove: () => removeParam("rating"),
    },
    (priceMin || priceMax) && {
      label: `Price: ৳${priceMin || "0"} – ${priceMax ? `৳${priceMax}` : "above"}`,
      onRemove: () => removeParam("price_min", "price_max"),
    },
    discount && {
      label: "On Sale",
      onRemove: () => removeParam("discount"),
    },
    search && {
      label: `Search: "${search}"`,
      onRemove: () => removeParam("search"),
    },
  ].filter(Boolean);

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-5">
      <span className="text-xs font-bold text-neutral/40 uppercase tracking-widest">
        Active:
      </span>
      {tags.map((tag) => (
        <span
          key={tag.label}
          className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full"
        >
          {tag.label}
          <button
            onClick={tag.onRemove}
            className="hover:text-error transition-colors cursor-pointer"
            aria-label={`Remove ${tag.label} filter`}
          >
            <FiX size={12} />
          </button>
        </span>
      ))}

      <button
        onClick={() => router.push(pathname)}
        className="text-xs font-bold text-error hover:underline ml-1"
      >
        Clear All
      </button>
    </div>
  );
};

export default ActiveFilterTags;
