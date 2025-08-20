import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { HiMenuAlt1 } from "react-icons/hi";
import { HiMiniXMark } from "react-icons/hi2";

import Logo from "./Logo";
import { AuthButtons } from "./AuthBtn";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/movies", label: "Movies" },
    ...(user ? [{ to: "/watchlist", label: "My List" }] : []),
  ];

  return (
    <nav
      className="bg-black text-white fixed w-full top-0 z-50 bg-opacity-90
     backdrop-blur-sm transition-all duration-300 px-8 md:px-0"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-0 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-300 hover:text-red-600 font-medium transition-all duration-300 transform  "
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <AuthButtons />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">
            <AuthButtons />
            <button
              className=" text-2xl focus:outline-none transition-all duration-300 transform hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <HiMiniXMark className="transition-transform duration-300 rotate-90" />
              ) : (
                <HiMenuAlt1 size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-4 mb-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg text-gray-300 hover:text-white font-medium transition-all duration-300 py-2 transform hover:translate-x-2 ${
                  isMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
