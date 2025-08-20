import { Link } from "react-router";
import { useWatchList } from "../hooks/useWatchList";
import type { IMovie } from "../types/movie";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";

const WatchListPage = () => {
  const { watchList, removeFromWatchListById } = useWatchList();

  if (!watchList.length)
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <p className="text-gray-400 text-center text-lg font-medium">
          Your watchlist is empty.
        </p>
      </div>
    );

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-black/95 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          My Watchlist
        </h1>

        <div className="space-y-3">
          {watchList.map((movie: IMovie) => (
            <div
              key={movie.id}
              className="bg-gray-900 rounded-lg shadow flex items-start gap-3 p-3 hover:bg-gray-800 transition-colors duration-200"
            >
              {/* Thumbnail */}
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-lg flex-shrink-0"
                />
              ) : (
                <div className="w-20 h-28 sm:w-24 sm:h-32 bg-gray-800 flex items-center justify-center rounded-lg text-gray-400 text-xs font-medium flex-shrink-0">
                  No Image
                </div>
              )}

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-white text-sm sm:text-base font-semibold line-clamp-2">
                    {movie.title}
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "N/A"}
                    {movie.vote_average &&
                      ` • ${movie.vote_average.toFixed(1)}/10`}
                  </p>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                    {movie.overview || "No description available."}
                  </p>
                </div>

                <div className="mt-2 flex gap-2">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="flex items-center gap-1 py-1 px-3 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 transition"
                  >
                    Details <AiOutlineArrowRight className="w-3 h-3" />
                  </Link>
                  <button
                    onClick={() => removeFromWatchListById(movie.id)}
                    className="flex items-center gap-1 py-1 px-3 bg-gray-700 text-white text-xs font-semibold rounded hover:bg-gray-600 transition"
                  >
                    <FaTrashAlt className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchListPage;
