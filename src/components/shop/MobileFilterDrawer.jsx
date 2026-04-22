"use client";

import { useCallback, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FiFilter, FiX, FiChevronDown, FiCheck } from "react-icons/fi";
import { cat, price_ranges, rat } from "./FilterSidebar";

const categories = cat;

const ratings = rat;

const priceRanges = price_ranges;

// ── Reusable accordion section ──
const FilterSection = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-base-200 last:border-none">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-4 px-5"
      >
        <span className="font-bold text-neutral text-sm">{title}</span>
        <FiChevronDown
          size={16}
          className={`text-neutral/50 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0 pb-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const MobileFilterDrawer = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ── Read active params ──
  const activeCategory = searchParams.get("category") || "";
  const activeRating = searchParams.get("rating") || "";
  const activeMin = searchParams.get("price_min") || "";
  const activeMax = searchParams.get("price_max") || "";
  const activeDiscount = searchParams.get("discount") || "";

  const activeCount = [
    activeCategory,
    activeRating,
    activeMin || activeMax,
    activeDiscount,
  ].filter(Boolean).length;

  // ── Param helpers ──
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
    min ? params.set("price_min", min) : params.delete("price_min");
    max ? params.set("price_max", max) : params.delete("price_max");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearAll = () => {
    router.push(pathname);
    setOpen(false);
  };

  return (
    <>
      {/* ── Trigger Button ── */}
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-2 btn btn-outline border-base-300 btn-sm rounded-xl text-neutral font-semibold"
      >
        <FiFilter size={15} />
        Filters
        {activeCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {/* ── Backdrop ── */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Drawer ── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-base-100 rounded-t-3xl shadow-2xl transition-transform duration-300 ease-in-out overflow-y-auto
          ${open ? "translate-y-0" : "translate-y-full"}`}
        style={{ maxHeight: "calc(88vh - 130px)" }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-base-300 rounded-full" />
        </div>

        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-base-200">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-neutral text-lg">Filters</h3>
            {activeCount > 0 && (
              <span className="badge badge-primary text-white badge-sm font-bold">
                {activeCount} active
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="btn btn-ghost btn-circle btn-sm"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(88vh - 130px)" }}
        >
          {/* ── Category ── */}
          <FilterSection title="Category" defaultOpen={true}>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setParam("category", cat.value)}
                    className={`flex items-center justify-between text-sm font-semibold px-3 py-2.5 rounded-xl border-2 transition-all duration-150
                      ${
                        isActive
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-base-200 text-neutral/60 hover:border-primary/30 hover:text-neutral"
                      }`}
                  >
                    {cat.label}
                    {isActive && <FiCheck size={13} />}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* ── Price Range ── */}
          <FilterSection title="Price Range">
            <div className="grid grid-cols-2 gap-2">
              {priceRanges.map((range) => {
                const isActive =
                  activeMin === range.min && activeMax === range.max;
                return (
                  <button
                    key={range.label}
                    onClick={() => setPriceRange(range.min, range.max)}
                    className={`flex items-center justify-between text-sm font-semibold px-3 py-2.5 rounded-xl border-2 transition-all duration-150
                      ${
                        isActive
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-base-200 text-neutral/60 hover:border-primary/30 hover:text-neutral"
                      }`}
                  >
                    {range.label}
                    {isActive && <FiCheck size={13} />}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* ── Rating ── */}
          <FilterSection title="Rating">
            <div className="flex flex-col gap-1.5">
              {ratings.map((r) => {
                const isActive = activeRating === r.value;
                return (
                  <button
                    key={r.value}
                    onClick={() => setParam("rating", isActive ? "" : r.value)}
                    className={`flex items-center justify-between text-sm font-semibold px-4 py-3 rounded-xl border-2 transition-all duration-150
                      ${
                        isActive
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-base-200 text-neutral/60 hover:border-primary/30 hover:text-neutral"
                      }`}
                  >
                    {r.label}
                    {isActive && <FiCheck size={14} />}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* ── Discount Toggle ── */}
          <FilterSection title="Discount">
            <label
              className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-150
                ${
                  activeDiscount === "true"
                    ? "border-primary bg-primary/10"
                    : "border-base-200"
                }`}
            >
              <div>
                <p className="text-sm font-bold text-neutral">On Sale Only</p>
                <p className="text-xs text-neutral/40 mt-0.5">
                  Show discounted products
                </p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={activeDiscount === "true"}
                onChange={(e) =>
                  setParam("discount", e.target.checked ? "true" : "")
                }
              />
            </label>
          </FilterSection>
        </div>

        {/* ── Footer Actions ── */}
        <div className="flex gap-3 px-5 py-4 border-t border-base-200">
          <button
            onClick={clearAll}
            className="btn btn-outline border-base-300 rounded-xl flex-1 font-bold text-neutral"
          >
            Clear All
          </button>
          <button
            onClick={() => setOpen(false)}
            className="btn btn-primary rounded-xl flex-1 font-bold"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileFilterDrawer;
