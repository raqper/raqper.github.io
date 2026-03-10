import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

const Home = lazy(() => import("./pages/career/Home"));
const Portfolio = lazy(() => import("./pages/portfolio/Portfolio"));
const HobbiesHome = lazy(() => import("./pages/hobbies/HobbiesHome"));

export const PORTFOLIO_PATH = "/portfolio/catlady";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/career" replace />,
    },
    {
      path: "/career",
      Component: Home,
    },
    {
      path: PORTFOLIO_PATH,
      Component: Portfolio,
    },
    {
      path: "/hobbies",
      Component: HobbiesHome,
    },
  ],
  { basename: "/" }
);
