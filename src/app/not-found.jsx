import Link from "next/link";
import { MdToys } from "react-icons/md";
import { FiHome, FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import { GiCardboardBox } from "react-icons/gi";

export const metadata = {
  title: "Page Not Found | Kidz Joy",
  description: "Oops! This page doesn't exist.",
};

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-16 bg-base-100">
      <div className="text-center max-w-lg w-full">
        {/* ── Animated Illustration Area ── */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Orbiting toy icons */}
          <div className="absolute w-56 h-56 animate-spin-slow">
            <MdToys
              size={32}
              className="absolute top-0 left-1/2 -translate-x-1/2 text-primary/30"
            />
            <MdToys
              size={22}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 text-accent/30"
            />
            <MdToys
              size={26}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-secondary/30"
            />
            <MdToys
              size={28}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-primary/20"
            />
          </div>

          {/* Center box icon */}
          <div className="relative z-10 w-36 h-36 bg-primary/10 rounded-3xl flex flex-col items-center justify-center border-2 border-primary/20 shadow-lg">
            <GiCardboardBox size={64} className="text-primary/60 mb-1" />
            <span className="text-xs font-bold text-primary/50 tracking-widest uppercase">
              Empty!
            </span>
          </div>
        </div>

        {/* ── 404 Big Number ── */}
        <div className="relative mb-2">
          <p className="text-[7rem] sm:text-[9rem] font-black leading-none text-primary/10 select-none absolute inset-x-0 top-0">
            404
          </p>
          <p className="text-[7rem] sm:text-[9rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent select-none relative z-10">
            404
          </p>
        </div>

        {/* ── Text ── */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral mb-3">
          Uh-oh! Toy Lost in Space 🚀
        </h1>
        <p className="text-neutral/60 text-sm sm:text-base leading-relaxed mb-8">
          The page you&apos;re looking for has gone missing — maybe a kid hid it
          somewhere! Let&apos;s get you back to the fun.
        </p>

        {/* ── Action Buttons ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="btn btn-primary rounded-xl gap-2 w-full sm:w-auto px-6"
          >
            <FiHome size={18} />
            Back to Home
          </Link>

          <Link
            href="/shop"
            className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white hover:border-primary rounded-xl gap-2 w-full sm:w-auto px-6"
          >
            <FiShoppingBag size={18} />
            Browse Toys
          </Link>
        </div>

        {/* ── Helpful Links ── */}
        <div className="mt-10 pt-6 border-t border-base-200">
          <p className="text-neutral/40 text-xs font-medium uppercase tracking-widest mb-3">
            Quick Links
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {[
              { label: "New Arrivals", href: "/new-arrivals" },
              { label: "Best Sellers", href: "/bestsellers" },
              { label: "Categories", href: "/categories" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-primary/70 hover:text-primary hover:underline underline-offset-4 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
