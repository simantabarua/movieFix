import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center overflow-auto flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90"></div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 sm:px-6 animate-fadeIn">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4 drop-shadow-lg text-center animate-slideDown">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 drop-shadow-lg text-center animate-slideDown">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-400 text-center text-lg mb-8 animate-fadeIn max-w-md">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track!
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-red-600 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-red-700 hover:scale-105 active:scale-95 text-sm sm:text-base"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
