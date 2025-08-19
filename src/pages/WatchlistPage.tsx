import { Link } from "react-router";
import { useWatchList } from "../hooks/useWatchList";

const WatchListPage = () => {
  const { watchList, removeFromWatchListById } = useWatchList();

  if (!watchList.length)
    return (
      <p className="p-4 text-center text-gray-500">Your watchlist is empty.</p>
    );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {watchList.map((movie) => (
          <div key={movie.id} className="border rounded-lg p-2 flex flex-col">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg mb-2"
              />
            ) : (
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-lg mb-2">
                No Image
              </div>
            )}
            <h2 className="font-semibold text-sm mb-1">{movie.title}</h2>
            <p className="text-gray-500 text-xs mb-2">
              {movie.release_date?.split("-")[0]}
            </p>
            <div className="mt-auto">
              <Link
                to={`/movie/${movie.id}`}
                className="block mb-1 text-center text-sm bg-blue-500 text-white rounded py-1 hover:opacity-90"
              >
                Details
              </Link>
              <button
                onClick={() => removeFromWatchListById(movie.id)}
                className="w-full text-sm bg-red-500 text-white rounded py-1 hover:opacity-90"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchListPage;
