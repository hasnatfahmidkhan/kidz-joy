"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

// ── Single NavLink ──
export const NavLink = ({ href, label }) => {
  const pathname = usePathname();

  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`font-semibold rounded-lg px-3 py-2 text-sm transition-all duration-150
        ${
          isActive
            ? "bg-white/30 text-white underline underline-offset-4 decoration-accent decoration-2"
            : "text-white/85 hover:bg-white/20 hover:text-white"
        }
      `}
    >
      {label}
    </Link>
  );
};

// ── Dropdown NavLink (Categories) ──
export const DropdownNavLink = ({ label, href, dplinks }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = pathname.startsWith(href);

  return (
    <li className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className={`flex items-center gap-1 font-semibold rounded-lg px-3 py-2 text-sm transition-all duration-150
          ${
            isActive
              ? "bg-white/30 text-white underline underline-offset-4 decoration-accent decoration-2"
              : "text-white/85 hover:bg-white/20 hover:text-white"
          }
        `}
      >
        {label}
        <FiChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute top-full left-0 mt-1 bg-base-100 text-neutral rounded-box z-50 shadow-xl w-48 p-1 border border-base-200">
          {dplinks.map((child) => (
            <ChildNavLink
              key={child.href}
              href={child.href}
              label={child.label}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// ── Child link inside dropdown ──
const ChildNavLink = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`block text-sm font-medium px-3 py-2 rounded-md transition-all duration-150
          ${isActive ? "text-primary font-semibold bg-base-200" : "hover:text-primary hover:bg-base-200"}
        `}
      >
        {label}
      </Link>
    </li>
  );
};
