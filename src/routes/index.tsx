import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import MainLayout from "../layout/MainLayout";
import PrivateRoute from "../components/PrivateRoute";
import Loader from "../components/Loader";

const SearchPage = lazy(() => import("../pages/SearchPage"));
const MovieDetails = lazy(() => import("../pages/MovieDetails"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const Movies = lazy(() => import("../pages/Movies"));
const WatchListPage = lazy(() => import("../pages/WatchListPage"));
const NotFound = lazy(() => import("../pages/404"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: () => (
          <Suspense fallback={<Loader />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: "search",
        Component: () => (
          <Suspense fallback={<Loader />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: "movie/:id",
        Component: () => (
          <Suspense fallback={<Loader />}>
            <MovieDetails />
          </Suspense>
        ),
      },
      {
        path: "movies",
        Component: () => (
          <Suspense fallback={<Loader />}>
            <Movies />
          </Suspense>
        ),
      },
      {
        path: "watchlist",
        Component: () => (
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <WatchListPage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        Component: () => (
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        Component: () => (
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);
