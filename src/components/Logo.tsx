import { Link } from "react-router";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center group">
      <span className="text-2xl md:text-3xl font-bold tracking-tight transition-all duration-300 transform group-hover:text-white/90">
        <span className="text-red-600 transition-colors duration-300 group-hover:text-red-500">
          Movie
        </span>
        Flix
      </span>
    </Link>
  );
}
