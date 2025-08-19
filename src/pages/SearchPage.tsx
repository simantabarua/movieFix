import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useSearchMoviesQuery } from "../redux/features/movies/movies.api";
import type { IMovie } from "../types/movie";

type SearchForm = {
  query: string;
};

const SearchPage = () => {
  const { register, handleSubmit, watch } = useForm<SearchForm>({
    defaultValues: { query: "" },
  });

  const query = watch("query");

  const { data, isLoading } = useSearchMoviesQuery(query, {
    skip: !query,
  });

  const onSubmit = (values: SearchForm) => {
    console.log("Searching:", values.query);
  };

  return (
    <div className=" py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Search Movies</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 mb-8">
          <input
            placeholder="Search movies..."
            {...register("query")}
            className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-400"
          />
          <button
            type="submit"
            className="py-3 px-6 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
          >
            Search
          </button>
        </form>

        {isLoading && (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="absolute text-white text-sm font-medium">
                Loading...
              </span>
            </div>
          </div>
        )}

        {!isLoading && data?.results?.length === 0 && query && (
          <p className="text-gray-400 text-center text-lg">
            No movies found for "{query}"
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {data?.results?.map((movie: IMovie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
