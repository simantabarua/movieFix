import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/movies", label: "Movies" },
    ...(user
      ? [
          { to: "/watchlist", label: "Watchlist" },
          {
            isButton: true,
            label: "Logout",
            onClick: handleLogout,
            className: "hover:text-red-500 cursor-pointer",
          },
        ]
      : [{ to: "/login", label: "Sign In" }]),
  ];

  return (
    <nav className="bg-black/90 text-white px-6 py-4 flex items-center justify-between shadow-lg fixed w-full top-0 z-50">
      {/* Logo */}
      <div className="text-3xl font-bold tracking-tight">
        <Link to="/" className="flex items-center">
          <span className="text-red-600">Movie</span>Flix
        </Link>
      </div>

      {/* Mobile menu toggle */}
      <button
        className="sm:hidden text-2xl focus:outline-none hover:text-red-600 transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? "✖" : "☰"}
      </button>

      <ul
        className={`flex flex-col sm:flex-row gap-6 sm:gap-10 absolute sm:static top-16 left-0 w-full sm:w-auto 
                   bg-black/95 sm:bg-transparent p-6 sm:p-0 transition-all duration-300 ease-in-out z-40
                   ${isMenuOpen ? "block" : "hidden sm:flex"}`}
      >
        {navLinks.map((link, index) => (
          <li key={index} className="text-center sm:text-left">
            {link.isButton ? (
              <button
                onClick={link.onClick}
                className="text-gray-300 hover:text-red-500 font-medium transition-colors duration-200"
              >
                {link.label}
              </button>
            ) : (
              <Link
                to={link.to as string}
                className="text-gray-300 hover:text-red-500 font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}