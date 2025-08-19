import { baseApi } from "../baseapi";
import type { Movie } from "./movies.types";

export const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchMovies: builder.query<{ results: Movie[] }, string>({
      query: (query) => ({ url: "search/movie", params: { query } }),
    }),

    getMovieDetails: builder.query<Movie, number>({
      query: (id) => ({ url: `movie/${id}` }),
    }),

    getPopularMovies: builder.query<{ results: Movie[] }, number | void>({
      query: (page = 1) => ({ url: "movie/popular", params: { page } }),
    }),
  }),
});

export const {
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetPopularMoviesQuery,
} = movieApi;
