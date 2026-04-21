"use client";

import { useState } from "react";
import Link from "next/link";
import { FiShoppingCart, FiSearch, FiUser, FiMenu, FiX } from "react-icons/fi";
import { MdToys } from "react-icons/md";
import Logo from "../Logo/Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Categories",
    href: "/categories",
    children: [
      { label: "Action Figures", href: "/categories/action-figures" },
      { label: "Board Games", href: "/categories/board-games" },
      { label: "Puzzles", href: "/categories/puzzles" },
      { label: "Outdoor Toys", href: "/categories/outdoor" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Mock cart count — replace with real state/context later
const CART_COUNT = 3;

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="max-w-7xl mx-auto px-2 sm:px-4">
      <div className="navbar min-h-16 gap-1">
        {/* ── NAVBAR START ── */}
        <div className="navbar-start gap-1">
          {/* Mobile hamburger dropdown */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-white lg:hidden"
              aria-label="Open menu"
            >
              <FiMenu size={22} />
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-neutral rounded-box z-50 mt-3 w-56 p-2 shadow-xl border border-base-200"
            >
              {navLinks.map((link) =>
                link.children ? (
                  <li key={link.label}>
                    <details>
                      <summary className="font-semibold">{link.label}</summary>
                      <ul>
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href}>{child.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link href={link.href} className="font-semibold">
                      {link.label}
                    </Link>
                  </li>
                ),
              )}

              {/* Mobile auth links */}
              <div className="divider my-1" />
              <li>
                <Link href="/login" className="font-semibold">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="font-semibold text-primary">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <Logo />
        </div>

        {/* ── NAVBAR CENTER — desktop links ── */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-0.5 px-1">
            {navLinks.map((link) =>
              link.children ? (
                // Dropdown nav item
                <li key={link.label}>
                  <details>
                    <summary className="font-semibold text-white hover:bg-white/20 hover:text-white rounded-lg transition-all duration-150 cursor-pointer">
                      {link.label}
                    </summary>
                    <ul className="bg-base-100 text-neutral rounded-box z-50 shadow-xl w-48 p-1 border border-base-200">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="text-sm font-medium hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-semibold text-white hover:bg-white/20 hover:text-white rounded-lg transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* ── NAVBAR END ── */}
        <div className="navbar-end gap-1">
          {/* Search — expands on focus (desktop) */}
          <div className="relative hidden sm:flex items-center">
            <input
              type="text"
              placeholder="Search toys..."
              className={`
                input input-sm bg-white/20 text-white placeholder:text-white/60
                border border-white/30 focus:border-white focus:bg-white/30
                rounded-full pl-4 pr-9 transition-all duration-300 focus:outline-none
                w-0 focus:w-44
              `}
            />
            <FiSearch
              className="absolute right-2.5 text-white pointer-events-none"
              size={15}
            />
          </div>

          {/* Search icon — mobile only */}
          <button
            className="btn btn-ghost btn-circle btn-sm text-white sm:hidden"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            {searchOpen ? <FiX size={20} /> : <FiSearch size={20} />}
          </button>

          {/* Cart icon with badge */}
          <Link
            href="/cart"
            className="btn btn-ghost btn-circle btn-sm text-white relative"
            aria-label="Cart"
          >
            <FiShoppingCart size={21} />
            {CART_COUNT > 0 && (
              <span className="badge badge-accent badge-xs absolute -top-0.5 -right-0.5 font-bold text-[10px] min-w-4 h-4 p-0 flex items-center justify-center">
                {CART_COUNT}
              </span>
            )}
          </Link>

          {/* User dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle btn-sm text-white"
              aria-label="Account"
            >
              <FiUser size={21} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-neutral rounded-box z-50 mt-3 w-44 p-2 shadow-xl border border-base-200"
            >
              <li>
                <Link href="/profile" className="font-semibold">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/orders" className="font-semibold">
                  My Orders
                </Link>
              </li>
              <div className="divider my-1" />
              <li>
                <Link href="/login" className="font-semibold">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="font-semibold text-primary">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile search bar — slides down when toggled */}
      {searchOpen && (
        <div className="pb-3 px-2 sm:hidden">
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
    </nav>
  );
};

export default Navbar;
