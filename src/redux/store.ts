import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";
import { baseApi } from "./features/baseapi";
import watchListReducer from './features/watchlist/watchlistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    watchList: watchListReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
