"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FiX } from "react-icons/fi";

const categories = [
  { label: "All", value: "" },
  { label: "Educational", value: "educational" },
  { label: "Flashcards", value: "flashcards" },
  { label: "Puzzles", value: "puzzles" },
  { label: "Costumes", value: "costumes" },
  { label: "STEM Toys", value: "stem-toys" },
];
export { categories as cat };

const ratings = [
  { label: "4★ & above", value: "4" },
  { label: "3★ & above", value: "3" },
  { label: "2★ & above", value: "2" },
];
export { categories as rat };

const priceRanges = [
  { label: "Under ৳500", min: "0", max: "500" },
  { label: "৳500 – ৳1000", min: "500", max: "1000" },
  { label: "৳1000 – ৳1500", min: "1000", max: "1500" },
  { label: "Above ৳1500", min: "1500", max: "" },
];
export { categories as price_ranges };

const FilterSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ── Helper: update a single param, reset page to 1 ──
  const setParam = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page"); // reset to page 1 on filter change
      router.push(`${pathname}?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [searchParams, pathname, router],
  );

  const setPriceRange = (min, max) => {
    const params = new URLSearchParams(searchParams.toString());
    if (min) params.set("price_min", min);
    else params.delete("price_min");
    if (max) params.set("price_max", max);
    else params.delete("price_max");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearAll = () => router.push(pathname);

  // ── Read current params ──
  const activeCategory = searchParams.get("category") || "";
  const activeRating = searchParams.get("rating") || "";
  const activeMin = searchParams.get("price_min") || "";
  const activeMax = searchParams.get("price_max") || "";
  const activeDiscount = searchParams.get("discount") || "";

  const hasActiveFilters =
    activeCategory || activeRating || activeMin || activeMax || activeDiscount;

  return (
    <aside className="w-full">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-black text-neutral text-lg">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs font-bold text-error hover:underline"
          >
            <FiX size={13} />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* ── Category ── */}
        <div>
          <p className="text-xs font-black text-neutral/50 uppercase tracking-widest mb-3">
            Category
          </p>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.value}>
                <button
                  onClick={() => setParam("category", cat.value)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-xl font-semibold transition-all duration-150 cursor-pointer
                    ${
                      activeCategory === cat.value
                        ? "bg-primary text-white"
                        : "text-neutral/70 hover:bg-base-200 hover:text-neutral"
                    }`}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="divider my-0" />

        {/* ── Price Range ── */}
        <div>
          <p className="text-xs font-black text-neutral/50 uppercase tracking-widest mb-3">
            Price Range
          </p>
          <ul className="space-y-1">
            {priceRanges.map((range) => {
              const isActive =
                activeMin === range.min && activeMax === range.max;
              return (
                <li key={range.label}>
                  <button
                    onClick={() => setPriceRange(range.min, range.max)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-xl font-semibold transition-all duration-150
                      ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-neutral/70 hover:bg-base-200 hover:text-neutral"
                      }`}
                  >
                    {range.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="divider my-0" />

        {/* ── Rating ── */}
        <div>
          <p className="text-xs font-black text-neutral/50 uppercase tracking-widest mb-3">
            Rating
          </p>
          <ul className="space-y-1">
            {ratings.map((r) => (
              <li key={r.value}>
                <button
                  onClick={() =>
                    setParam("rating", activeRating === r.value ? "" : r.value)
                  }
                  className={`w-full text-left text-sm px-3 py-2 rounded-xl font-semibold transition-all duration-150
                    ${
                      activeRating === r.value
                        ? "bg-primary text-white"
                        : "text-neutral/70 hover:bg-base-200 hover:text-neutral"
                    }`}
                >
                  {r.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="divider my-0" />

        {/* ── On Sale Toggle ── */}
        <div>
          <p className="text-xs font-black text-neutral/50 uppercase tracking-widest mb-3">
            Discount
          </p>
          <label className="flex items-center justify-between cursor-pointer px-1">
            <span className="text-sm font-semibold text-neutral/70">
              On Sale Only
            </span>
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-sm"
              checked={activeDiscount === "true"}
              onChange={(e) =>
                setParam("discount", e.target.checked ? "true" : "")
              }
            />
          </label>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
