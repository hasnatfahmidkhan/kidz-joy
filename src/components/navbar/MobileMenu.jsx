"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";

const MobileMenu = ({ navLinks }) => {
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
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
                <summary
                  className={`font-semibold ${isActive(link.href) ? "text-primary" : ""}`}
                >
                  {link.label}
                </summary>
                <ul>
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={`${pathname === child.href ? "text-primary font-semibold" : ""}`}
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
                className={`font-semibold ${isActive(link.href) ? "text-primary" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ),
        )}

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
  );
};

export default MobileMenu;
