const tmdbConfig = {
  apiKey: import.meta.env.VITE_TMDB_API_KEY,
  baseurl: "https://api.themoviedb.org/3",
};
export const { apiKey, baseurl } = tmdbConfig;
