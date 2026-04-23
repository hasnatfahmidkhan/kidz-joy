import Logo from "../Logo/Logo";
import MobileMenu from "../navbar/MobileMenu";
import { NavLink, DropdownNavLink } from "../navbar/NavLink";
import SearchBar from "../navbar/SearchBar";
import CartButton from "../navbar/CartButton";
import UserMenu from "../navbar/UserMenu";

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

const CART_COUNT = 3; // 🔁 replace with real DB/session value later

const Navbar = () => {
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
          <CartButton count={CART_COUNT} />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
