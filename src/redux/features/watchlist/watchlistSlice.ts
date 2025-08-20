import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WatchListState {
  watchList: number[];
}

const storedIds =
  typeof window !== "undefined" ? localStorage.getItem("watchListIds") : null;

const initialState: WatchListState = {
  watchList: storedIds ? JSON.parse(storedIds) : [],
};

const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    addToWatchList: (state, action: PayloadAction<number>) => {
      if (!state.watchList.includes(action.payload)) {
        state.watchList.push(action.payload);
        localStorage.setItem("watchListIds", JSON.stringify(state.watchList));
      }
    },
    removeFromWatchList: (state, action: PayloadAction<number>) => {
      state.watchList = state.watchList.filter((id) => id !== action.payload);
      localStorage.setItem("watchListIds", JSON.stringify(state.watchList));
    },
    clearWatchList: (state) => {
      state.watchList = [];
      localStorage.setItem("watchListIds", JSON.stringify([]));
    },
  },
});

export const { addToWatchList, removeFromWatchList, clearWatchList } =
  watchListSlice.actions;

export default watchListSlice.reducer;
