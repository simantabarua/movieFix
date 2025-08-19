import axios from "axios";
import { apiKey, baseurl } from "../config/tmdb/tmdb.config";

export const axiosInstance = axios.create({
  baseURL: baseurl,
  params: {
    api_key: apiKey,
  },
});
