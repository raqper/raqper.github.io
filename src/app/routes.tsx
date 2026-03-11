import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const Home = lazy(() => import("./pages/career/Home"));
const Portfolio = lazy(() => import("./pages/portfolio/Portfolio"));
const HobbiesHome = lazy(() => import("./pages/hobbies/HobbiesHome"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Portfolio,
  },
  {
    path: "/career",
    Component: Home,
  },
  {
    path: "/hobbies",
    Component: HobbiesHome,
  },
]);
