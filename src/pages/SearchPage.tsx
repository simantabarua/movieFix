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
    <div className="p-4 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-4">
        <input placeholder="Search movies..." {...register("query")} />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data?.results?.map((movie: IMovie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="border rounded-lg p-2 hover:shadow-lg transition"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg mb-2"
            />
            <h2 className="font-semibold text-sm">{movie.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
