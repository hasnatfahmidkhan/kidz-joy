import Logo from "../Logo/Logo";
import { NavLink, DropdownNavLink } from "../navbar/NavLink";
import SearchBar from "../navbar/SearchBar";
import CartButton from "../navbar/CartButton";
import UserMenu from "../navbar/UserMenu";
import MobileMenu from "../navbar/MobileMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

const baseNavLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Categories",
    href: "/categories",
    children: [
      { label: "Educational", href: "/shop?category=educational" },
      { label: "Flashcards", href: "/shop?category=flashcards" },
      { label: "Puzzles", href: "/shop?category=puzzles" },
      { label: "Costumes", href: "/shop?category=costumes" },
      { label: "STEM Toys", href: "/shop?category=stem-toys" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const authNavLinks = [
  { label: "Wish List", href: "/wishlist", protected: true },
];

const CART_COUNT = 3; // 🔁 replace with real DB/session value later

const Navbar = async () => {
  // server session check
  const session = await getServerSession(authOptions);

  // Build navLinks based on session
  const navLinks = [...baseNavLinks, ...(session ? authNavLinks : [])];

  return (
    <nav className="relative max-w-7xl mx-auto px-2 sm:px-4">
      <div className="navbar min-h-16 gap-1">
        {/* ── NAVBAR START ── */}
        <div className="navbar-start gap-1">
          <MobileMenu navLinks={navLinks} />
          <Logo />
        </div>

        {/* ── NAVBAR CENTER — desktop links ── */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-0.5 px-1">
            {navLinks.map((link) =>
              link.children ? (
                <DropdownNavLink
                  key={link.label}
                  label={link.label}
                  href={link.href}
                  dplinks={link.children}
                />
              ) : (
                <li key={link.href}>
                  <NavLink href={link.href} label={link.label} />
                </li>
              ),
            )}
          </ul>
        </div>

        {/* ── NAVBAR END ── */}
        <div className="navbar-end gap-1">
          <SearchBar />
          {session && <CartButton count={CART_COUNT} />}
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
