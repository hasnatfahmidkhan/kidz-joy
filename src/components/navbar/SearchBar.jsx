"use client";

import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Desktop: expands on focus ── */}
      <div className="relative hidden sm:flex items-center">
        <input
          type="text"
          placeholder="Search toys..."
          className="
            input input-sm bg-white/20 text-white placeholder:text-white/60
            border border-white/30 focus:border-white focus:bg-white/30
            rounded-full pl-4 pr-9 transition-all duration-300 focus:outline-none
            w-0 focus:w-44
          "
        />
        <FiSearch
          className="absolute right-2.5 text-white pointer-events-none"
          size={15}
        />
      </div>

      {/* ── Mobile: toggle icon ── */}
      <button
        className="btn btn-ghost btn-circle btn-sm text-white sm:hidden"
        aria-label="Search"
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? <FiX size={20} /> : <FiSearch size={20} />}
      </button>

      {/* ── Mobile: expanded search bar ── */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 px-4 pb-3 sm:hidden bg-primary z-40">
          <div className="relative">
            <input
              type="text"
              placeholder="Search toys..."
              autoFocus
              className="input input-sm w-full bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:border-white focus:bg-white/30 rounded-full pl-4 pr-9 focus:outline-none"
            />
            <FiSearch
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none"
              size={15}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
