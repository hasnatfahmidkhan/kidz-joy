"use client";

import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";

const UserMenu = () => {
  const { clearCart } = useCart();
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    clearCart(); // ── clear cart state + localStorage before logout
    await signOut({ callbackUrl: "/" });
  };

  return (
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
        {status === "authenticated" ? (
          <>
            {/* Logged in */}
            <li className="px-3 py-2 border-b border-base-200 mb-1">
              <div className="pointer-events-none">
                <p className="font-black text-neutral text-xs truncate">
                  {session.user.name}
                </p>
                <p className="text-neutral/40 text-[10px] truncate">
                  {session.user.email}
                </p>
              </div>
            </li>
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
            {session.user.role === "admin" && (
              <li>
                <Link href="/admin" className="font-semibold text-primary">
                  Admin Panel
                </Link>
              </li>
            )}
            <div className="divider my-1" />
            <li>
              <button
                onClick={handleSignOut}
                className="font-semibold text-error"
              >
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            {/* Not logged in */}
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
          </>
        )}
      </ul>
    </div>
  );
};

export default UserMenu;
