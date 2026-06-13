"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/shop?search=${encodeURIComponent(trimmed)}`);
    setQuery("");
    setMobileOpen(false);
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <>
      {/* ── Desktop: expands on focus ── */}
      <form
        onSubmit={handleSearch}
        className="relative hidden sm:flex items-center"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search toys..."
          className="
            input input-sm bg-white/20 text-white placeholder:text-white/60
            border border-white/30 focus:border-white focus:bg-white/30
            rounded-full pl-4 pr-8 transition-all duration-300 focus:outline-none
            w-0 focus:w-44
          "
        />
        {/* Clear button — shows when typing */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-6 text-white/60 hover:text-white transition-colors"
          >
            <FiX size={13} />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 text-white/70 hover:text-white transition-colors"
          aria-label="Search"
        >
          <FiSearch size={14} />
        </button>
      </form>

      {/* ── Mobile: toggle icon ── */}
      <button
        className="btn btn-ghost btn-circle btn-sm text-white sm:hidden"
        aria-label="Search"
        onClick={() => setMobileOpen((v) => !v)}
        type="button"
      >
        {mobileOpen ? <FiX size={20} /> : <FiSearch size={20} />}
      </button>

      {/* ── Mobile: expanded search bar ── */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 px-4 pb-3 sm:hidden bg-primary z-40 shadow-lg">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search toys..."
              autoFocus
              className="input input-sm w-full bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:border-white focus:bg-white/30 rounded-full pl-4 pr-16 focus:outline-none"
            />
            {/* Clear */}
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-9 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                <FiX size={13} />
              </button>
            )}
            {/* Submit */}
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              aria-label="Search"
            >
              <FiSearch size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SearchBar;
