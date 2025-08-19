import { createBrowserRouter } from "react-router";
import SearchPage from "../pages/SearchPage";
import MovieDetails from "../pages/MovieDetails";
import WatchListPage from "../pages/WatchlistPage";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: SearchPage,
      },
      {
        path: "search",
        Component: SearchPage,
      },
      {
        path: "movie/:id",
        Component: MovieDetails,
      },
      {
        path: "watchlist",
        Component: WatchListPage,
      },
      {
        path: "login",
        Component: LoginPage,
      },
    ],
  },
]);
