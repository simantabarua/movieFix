import { Link } from "react-router";
import { useWatchList } from "../hooks/useWatchList";
import type { IMovie } from "../types/movie";

const WatchListPage = () => {
  const { watchList, removeFromWatchListById } = useWatchList();

  if (!watchList.length)
    return (
      <div className="  flex items-center justify-center">
        <p className="text-gray-400 text-xl font-medium text-center">
          Your watchlist is empty.
        </p>
      </div>
    );

  return (
    <div className=" pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">My Watchlist</h1>

        <div className="space-y-4">
          {watchList.map((movie: IMovie) => (
            <div
              key={movie.id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg flex items-start gap-4 p-4 hover:bg-gray-800 transition-colors duration-200"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-24 h-36 object-cover rounded-lg"
                />
              ) : (
                <div className="w-24 h-36 bg-gray-800 flex items-center justify-center rounded-lg text-gray-400 text-xs font-medium">
                  No Image
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <h2 className="text-white text-lg font-semibold line-clamp-1">
                  {movie.title}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "N/A"}
                  {movie.vote_average &&
                    ` • ${movie.vote_average.toFixed(1)}/10`}
                </p>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {movie.overview || "No description available."}
                </p>
                <div className="mt-4 flex gap-3">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="py-1.5 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => removeFromWatchListById(movie.id)}
                    className="py-1.5 px-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    Remove
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
