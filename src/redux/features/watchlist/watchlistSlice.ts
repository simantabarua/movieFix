import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IMovie } from "../../../types/movie";

interface WatchListState {
  watchList: IMovie[];
}

const initialState: WatchListState = {
  watchList: [],
};

const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    setWatchList: (state, action: PayloadAction<IMovie[]>) => {
      state.watchList = action.payload;
    },
    addToWatchList: (state, action: PayloadAction<IMovie>) => {
      state.watchList.push(action.payload);
    },
    removeFromWatchList: (state, action: PayloadAction<number>) => {
      state.watchList = state.watchList.filter(
        (movie) => movie.id !== action.payload
      );
    },
    clearWatchList: (state) => {
      state.watchList = [];
    },
  },
});

export const {
  setWatchList,
  addToWatchList,
  removeFromWatchList,
  clearWatchList,
} = watchListSlice.actions;

export default watchListSlice.reducer;
