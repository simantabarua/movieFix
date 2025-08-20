import { Link } from "react-router";
import type { IMovie } from "../types/movie";

interface MovieCardProps {
  movie: IMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  console.log(movie);
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="bg-black/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
        }
        alt={movie.title}
        className="w-full h-72 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-white text-base font-semibold truncate">
          {movie.title}
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : "N/A"}
          {movie.vote_average ? ` • ${movie.vote_average.toFixed(1)}/10` : ""}
        </p>
      </div>
    </Link>
  );
}
