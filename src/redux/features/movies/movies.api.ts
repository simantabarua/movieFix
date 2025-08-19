import type { IMovie } from "../../../types/movie";
import { baseApi } from "../baseapi";

export const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchMovies: builder.query<{ results: IMovie[] }, string>({
      query: (query) => ({ url: "search/movie", params: { query } }),
    }),

    getMovieDetails: builder.query<IMovie, number>({
      query: (id) => ({ url: `movie/${id}` }),
    }),

    getPopularMovies: builder.query<{ results: IMovie[] }, number | void>({
      query: (page = 1) => ({ url: "movie/popular", params: { page } }),
    }),
  }),
});

export const {
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetPopularMoviesQuery,
} = movieApi;
