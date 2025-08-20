import { useForm } from "react-hook-form";
import { useSearchMoviesQuery } from "../redux/features/movies/movies.api";
import type { IMovie } from "../types/movie";
import bg from "../assets/searchbg.jpg";
import MovieCard from "../components/MovieCard";
import { FaSearch } from "react-icons/fa";
import Loader from "../components/Loader";

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
    <div
      className="relative min-h-screen bg-cover bg-center overflow-auto flex flex-col"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90"></div>

      <div
        className={`relative z-10 flex flex-col items-center justify-center flex-1 px-4 sm:px-6 animate-fadeIn  ${
          data?.results?.length ? "mt-20" : "mt-0"
        }`}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 sm:mb-8 drop-shadow-lg text-center animate-slideDown">
          Search Movies
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-2xl mx-auto animate-slideUp"
        >
          <div className="relative flex-grow">
            <input
              type="text"
              value={query}
              {...register("query")}
              placeholder="Search for movies..."
              className="w-full bg-black/60 text-white border border-gray-600 rounded-full pl-12 pr-4 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 shadow-lg transition-all duration-300 hover:border-red-500 text-sm sm:text-base"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch className="text-lg sm:text-xl" />
            </div>
          </div>
          <button
            type="submit"
            className="ml-2 sm:ml-4 flex items-center justify-center px-4 sm:px-6 rounded-full bg-red-600 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-red-700 hover:scale-105 active:scale-95 text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Search</span>
            <span className="sm:hidden">
              <FaSearch />
            </span>
          </button>
        </form>
        );
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full pb-20 px-6">
        {isLoading && <Loader />}

        {!isLoading && data?.results?.length === 0 && query && (
          <p className="text-gray-400 text-center text-lg animate-fadeIn">
            No movies found for "{query}"
          </p>
        )}

        {data?.results && data.results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-12 animate-fadeIn">
            {data.results.map((movie: IMovie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
