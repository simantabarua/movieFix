import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";
import { useGetPopularMoviesQuery } from "../redux/features/movies/movies.api";
import type { IMovie } from "../types/movie";

const Movies = () => {
  const { data, isLoading, error } = useGetPopularMoviesQuery(1);

  if (isLoading) return <Loader />;
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
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
