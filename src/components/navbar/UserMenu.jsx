"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiUser } from "react-icons/fi";

const UserMenu = () => {
  const session = useSession();

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
        {session.status === "authenticated" ? (
          <>
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
              <button
                onClick={() => signOut()}
                className="font-semibold text-error"
              >
                Log out
              </button>
            </li>
          </>
        ) : (
          <>
            {" "}
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
