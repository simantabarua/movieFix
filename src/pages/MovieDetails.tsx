import { useParams, useNavigate } from "react-router";
import { useGetMovieDetailsQuery } from "../redux/features/movies/movies.api";
import { useWatchList } from "../hooks/useWatchList";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: movie, isLoading, error } = useGetMovieDetailsQuery(Number(id));
  const { addToWatchList, removeFromWatchListById } = useWatchList();

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error || !movie)
    return <p className="p-4">Failed to load movie details</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        className="mb-4 text-blue-500 underline"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-4">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg"
          />
        )}

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-500 mb-2">{movie.release_date}</p>
          <p className="mb-4">{movie.overview}</p>

          <div className="flex gap-2">
            <button onClick={() => addToWatchList(movie)}>+ WatchList</button>
            <button onClick={() => removeFromWatchListById(movie.id)}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
