import { useGetPopularMoviesQuery } from "../redux/features/movies/movies.api";

const Movies = () => {
  const { data, isLoading, error } = useGetPopularMoviesQuery(1);
  console.log(data);
  if (isLoading) return <p>Loading movies...</p>;
  if (error) return <p>Failed to load movies</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {data?.results.map((movie) => (
        <div key={movie.id} className="bg-gray-800 rounded p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded"
          />
          <h2 className="text-white mt-2 text-sm">{movie.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default Movies;
