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
            className: "hover:text-yellow-400 cursor-pointer",
          },
        ]
      : [{ to: "/login", label: "Sign In" }]),
  ];

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-lg">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide">
        <Link to="/" className="flex items-center">
          <span className="text-yellow-400">Movie</span>Flix
        </Link>
      </div>

      {/* Mobile menu toggle */}
      <button
        className="sm:hidden text-2xl focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? "✖" : "☰"}
      </button>

      <ul
        className={`flex flex-col sm:flex-row gap-4 sm:gap-8 absolute sm:static top-16 left-0 w-full sm:w-auto 
                   bg-gray-900 sm:bg-transparent p-4 sm:p-0 transition-all duration-300 ease-in-out z-10
                   ${isMenuOpen ? "block" : "hidden sm:flex"}`}
      >
        {navLinks.map((link, index) => (
          <li key={index} className="text-center sm:text-left">
            {link.isButton ? (
              <button onClick={link.onClick} className={link.className}>
                {link.label}
              </button>
            ) : (
              <Link
                to={link.to as string}
                className="hover:text-yellow-400 transition-colors duration-200"
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
