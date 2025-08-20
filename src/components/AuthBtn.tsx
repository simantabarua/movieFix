import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const AuthButtons = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const baseBtn =
    "px-4 md:px-6 py-1 md:py-2 text-sm font-semibold tracking-wide rounded-full transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500";

  return user ? (
    <button
      onClick={handleLogout}
      className={`${baseBtn} bg-red-600 text-white hover:bg-red-700 hover:scale-105 active:scale-95`}
    >
      Sign Out
    </button>
  ) : (
    <Link
      to="/login"
      className={`${baseBtn} bg-red-600 text-white hover:bg-red-700 hover:scale-105 active:scale-95`}
    >
      Sign In
    </Link>
  );
};
