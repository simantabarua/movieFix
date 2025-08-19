import { createBrowserRouter } from "react-router";
import SearchPage from "../pages/SearchPage";
import MovieDetails from "../pages/MovieDetails";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../layout/MainLayout";
import PrivateRoute from "../components/PrivateRoute";
import Movies from "../pages/Movies";
import WatchListPage from "../pages/WatchListPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: SearchPage },
      { path: "search", Component: SearchPage },
      { path: "movie/:id", Component: MovieDetails },
      { path: "movies", Component: Movies },

      {
        path: "watchlist",
        Component: () => (
          <PrivateRoute>
            <WatchListPage />
          </PrivateRoute>
        ),
      },
      { path: "login", Component: LoginPage },
    ],
  },
]);
