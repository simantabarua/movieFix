import { useParams, useNavigate } from "react-router";
import { useGetMovieDetailsQuery } from "../redux/features/movies/movies.api";
import { useWatchList } from "../hooks/useWatchList";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: movie, isLoading, error } = useGetMovieDetailsQuery(Number(id));
  const { addToWatchList } = useWatchList();

  if (isLoading)
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="absolute text-white text-base font-semibold">
            Loading...
          </span>
        </div>
      </div>
    );
  if (error || !movie)
    return (
      <div className=" bg-black/90 text-white flex items-center justify-center">
        <p className="text-red-500 text-xl font-semibold">
          Failed to load movie details
        </p>
      </div>
    );

  return (
    <div className="bg-black/95  pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          className="mb-8 flex items-center gap-2 text-gray-300 hover:text-red-600 text-lg font-medium transition-colors duration-200"
          onClick={() => navigate(-1)}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <div className="relative bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
          {movie.backdrop_path && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage: `ur[](https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
              }}
            ></div>
          )}
          <div className="relative flex flex-col lg:flex-row gap-8 p-6 lg:p-8">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full lg:w-80 h-[28rem] object-cover rounded-lg shadow-md"
              />
            ) : (
              <div className="w-full lg:w-80 h-[28rem] bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 text-sm font-medium">
                No Image Available
              </div>
            )}

            <div className="flex-1 text-white">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-300 text-sm mb-4">
                <span>
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "N/A"}
                </span>
                {movie.vote_average && (
                  <span>
                    {movie.vote_average.toFixed(1)}/10 (
                    {movie.vote_count?.toLocaleString() || "N/A"} votes)
                  </span>
                )}
                {movie.popularity && (
                  <span>Popularity: {Math.round(movie.popularity)}</span>
                )}
                {movie.original_Language && (
                  <span>Language: {movie.original_Language.toUpperCase()}</span>
                )}
              </div>
              {movie.genre_ids && movie.genre_ids.length > 0 && (
                <p className="text-gray-300 text-sm mb-4">
                  Genres:{" "}
                  {movie.genre_ids
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .map((genre: any) => genre.name)
                    .join(", ")}
                </p>
              )}
              <p className="text-gray-200 text-base leading-relaxed mb-6">
                {movie.overview || "No description available."}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => addToWatchList(movie)}
                  className="py-2.5 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
