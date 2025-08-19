import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  addToWatchList,
  removeFromWatchList,
  setWatchList,
} from "../redux/features/watchlist/watchlistSlice";
import type { IMovie } from "../types/movie";

export const useWatchList = () => {
  const dispatch = useAppDispatch();
  const watchList = useAppSelector((state) => state.watchList.watchList);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("watchList");
      if (stored) dispatch(setWatchList(JSON.parse(stored)));
    } catch (error) {
      console.error("Failed to parse watchList from localStorage", error);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      localStorage.setItem("watchList", JSON.stringify(watchList));
    } catch (error) {
      console.error("Failed to save watchList to localStorage", error);
    }
  }, [watchList]);

  return {
    watchList,
    addToWatchList: (movie: IMovie) => dispatch(addToWatchList(movie)),
    removeFromWatchListById: (id: number) => dispatch(removeFromWatchList(id)),
  };
};
