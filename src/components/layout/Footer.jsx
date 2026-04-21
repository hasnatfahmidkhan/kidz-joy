import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import Logo from "../Logo/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* ── COLUMN 1: Brand & Description ── */}
        <div className="space-y-4">
          {/* Logo */}
          <Logo />

          {/* describe */}
          <p className="text-white/80 text-sm leading-relaxed">
            Bringing smiles to children with quality, safe, and fun toys. Your
            one-stop shop for all things play!
          </p>

          {/* Social Media */}
          <div className="flex gap-2 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-sm bg-white/20 border-none text-white hover:bg-white/30 hover:scale-110 transition-all duration-200"
              aria-label="Facebook"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-sm bg-white/20 border-none text-white hover:bg-white/30 hover:scale-110 transition-all duration-200"
              aria-label="Instagram"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-sm bg-white/20 border-none text-white hover:bg-white/30 hover:scale-110 transition-all duration-200"
              aria-label="Twitter"
            >
              <FaTwitter size={16} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-sm bg-white/20 border-none text-white hover:bg-white/30 hover:scale-110 transition-all duration-200"
              aria-label="YouTube"
            >
              <FaYoutube size={16} />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-sm bg-white/20 border-none text-white hover:bg-white/30 hover:scale-110 transition-all duration-200"
              aria-label="Pinterest"
            >
              <FaPinterestP size={16} />
            </a>
          </div>
        </div>

        {/* ── COLUMN 2: Quick Links ── */}
        <div>
          <h3 className="text-white font-bold text-base mb-4">Quick Links</h3>
          <ul className="space-y-2.5">
            <li>
              <Link
                href="/shop"
                className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm"
              >
                Shop All Toys
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/new-arrivals"
                className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm"
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link
                href="/bestsellers"
                className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm"
              >
                Best Sellers
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* ── COLUMN 3: Customer Service ── */}
        <div>
          <h3 className="text-white font-bold text-base mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2.5">
            <li>
              <Link
                href="/orders"
                className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm"
              >
                Track Order
              </Link>
            </li>
            <li>
              <Link
                href="/shipping"
                className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm"
              >
                Shipping Info
              </Link>
            </li>
            <li>
              <Link
                href="/returns"
                className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm"
              >
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* ── COLUMN 4: Contact & Newsletter ── */}
        <div>
          <h3 className="text-white font-bold text-base mb-4">Get In Touch</h3>

          {/* Contact Info */}
          <ul className="space-y-3 mb-5">
            <li className="flex items-start gap-2 text-white/80 text-sm">
              <MdLocationOn size={18} className="mt-0.5 shrink-0 text-white" />
              <span>123 Toy Street, Play City, PC 12345</span>
            </li>
            <li className="flex items-center gap-2 text-white/80 text-sm">
              <MdPhone size={18} className="shrink-0 text-white" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-2 text-white/80 text-sm">
              <MdEmail size={18} className="shrink-0 text-white" />
              <span>hello@kidzjoy.com</span>
            </li>
          </ul>

          {/* Newsletter */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-sm">
              Subscribe to Newsletter
            </h4>
            <form className="flex gap-1">
              <input
                type="email"
                placeholder="Your email"
                className="input input-sm flex-1 bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:border-white focus:bg-white/30 rounded-lg focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="btn btn-sm bg-accent hover:bg-accent/90 text-white border-none rounded-lg"
                aria-label="Subscribe"
              >
                <FiSend size={16} />
              </button>
            </form>
            <p className="text-white/60 text-xs">
              Get updates on new toys & exclusive offers!
            </p>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="divider before:bg-white/20 after:bg-white/20 my-6" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p className="text-white/70 text-center sm:text-left">
          © {currentYear}{" "}
          <span className="font-semibold text-white">KidzJoy</span>. All rights
          reserved.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="/terms"
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            Terms
          </Link>
          <span className="text-white/30">•</span>
          <Link
            href="/privacy"
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            Privacy
          </Link>
          <span className="text-white/30">•</span>
          <Link
            href="/cookies"
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            Cookies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
