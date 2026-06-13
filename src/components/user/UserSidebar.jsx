"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  FiUser,
  FiShoppingBag,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";

const navItems = [
  {
    label: "My Orders",
    href: "/orders",
    icon: FiShoppingBag,
  },
  {
    label: "Profile Settings",
    href: "/profile",
    icon: FiUser,
  },
];

const UserSidebar = ({ user }) => {
  const pathname = usePathname();

  return (
    <div className="bg-base-100 border border-base-200 rounded-2xl overflow-hidden">
      {/* ── User Info ── */}
      <div className="p-5 border-b border-base-200 bg-primary/5">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary/20 shrink-0 border-2 border-primary/20">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-primary font-black text-lg">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>

          {/* Name + Email */}
          <div className="min-w-0">
            <p className="font-black text-neutral text-sm truncate">
              {user?.name || "User"}
            </p>
            <p className="text-neutral/50 text-xs truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* ── Nav Links ── */}
      <nav className="p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-150
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-neutral/70 hover:bg-base-200 hover:text-neutral"
                }`}
            >
              <Icon size={18} />
              <span className="flex-1">{item.label}</span>
              {isActive && <FiChevronRight size={14} />}
            </Link>
          );
        })}

        <div className="divider my-1" />

        {/* ── Sign Out ── */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-error hover:bg-error/10 transition-all duration-150 w-full"
        >
          <FiLogOut size={18} />
          Sign Out
        </button>
      </nav>
    </div>
  );
};

export default UserSidebar;
