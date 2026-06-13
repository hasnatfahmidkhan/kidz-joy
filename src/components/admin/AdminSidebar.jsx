"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiLayout,
  FiShoppingBag,
  FiPackage,
  FiUsers,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: FiLayout },
  { label: "Orders", href: "/admin/orders", icon: FiShoppingBag },
  { label: "Products", href: "/admin/products", icon: FiPackage },
  { label: "Users", href: "/admin/users", icon: FiUsers },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-base-100 border border-base-200 rounded-2xl overflow-hidden">
      {/* ── Header ── */}
      <div className="p-5 bg-primary text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <FiLayout size={20} />
          </div>
          <div>
            <p className="font-black text-sm">Admin Panel</p>
            <p className="text-white/70 text-xs">Kidz Joy</p>
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-150
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-neutral/70 hover:bg-base-200"
                }`}
            >
              <Icon size={18} />
              <span className="flex-1">{item.label}</span>
              {isActive && <FiChevronRight size={14} />}
            </Link>
          );
        })}

        <div className="divider my-2" />

        {/* ── Sign Out ── */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-error hover:bg-error/10 transition-all w-full"
        >
          <FiLogOut size={18} />
          Sign Out
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
