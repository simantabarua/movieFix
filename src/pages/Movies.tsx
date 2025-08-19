import { useGetPopularMoviesQuery } from "../redux/features/movies/movies.api";
import type { IMovie } from "../types/movie";

const Movies = () => {
  const { data, isLoading, error } = useGetPopularMoviesQuery(1);

  if (isLoading)
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="absolute text-white text-sm font-medium">
            Loading...
          </span>
        </div>
      </div>
    );
  if (error)
    return (
      <div className=" bg-black/90 text-white flex items-center justify-center">
        <p className="text-red-500 text-lg font-medium">
          Failed to load movies
        </p>
      </div>
    );

  return (
    <div className="bg-black/90  py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Popular Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {data?.results.map((movie: IMovie) => (
            <div
              key={movie.id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-white text-base font-semibold truncate">
                  {movie.title}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "N/A"}
                  {movie.vote_average &&
                    ` • ${movie.vote_average.toFixed(1)}/10`}
                </p>
                <p className="text-gray-500 text-xs mt-2 line-clamp-3">
                  {movie.overview || "No description available."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
