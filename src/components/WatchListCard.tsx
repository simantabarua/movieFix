import { Link } from "react-router";
import { useGetMovieDetailsQuery } from "../redux/features/movies/movies.api";
import { useAppDispatch } from "../redux/hook";
import { removeFromWatchList } from "../redux/features/watchlist/watchlistSlice";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";

type MovieCardProps = { id: number };

const WatchListCard = ({ id }: MovieCardProps) => {
  const dispatch = useAppDispatch();
  const { data: movie, isLoading } = useGetMovieDetailsQuery(id);

  if (isLoading || !movie) return null;

  return (
    <div className="bg-gray-900 rounded-lg shadow flex items-start gap-3 p-3 hover:bg-gray-800 transition-colors duration-200">
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
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-white text-sm sm:text-base font-semibold line-clamp-2">
            {movie.title}
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
            {movie.vote_average && ` • ${movie.vote_average.toFixed(1)}/10`}
          </p>
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">
            {movie.overview || "No description available."}
          </p>
        </div>
      </div>
      <div className="mt-2 flex flex-col md:flex-row gap-2">
        <Link
          to={`/movie/${movie.id}`}
          className="flex items-center gap-1 py-1 px-3 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 transition"
        >
          Details <AiOutlineArrowRight className="w-3 h-3" />
        </Link>
        <button
          onClick={() => dispatch(removeFromWatchList(movie.id))}
          className="flex items-center gap-1 py-1 px-3 bg-gray-700 text-white text-xs font-semibold rounded hover:bg-gray-600 transition"
        >
          <FaTrashAlt className="w-3 h-3" /> Remove
        </button>
      </div>
    </div>
  );
};

export default WatchListCard;
