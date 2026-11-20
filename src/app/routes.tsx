import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

const Home = lazy(() => import("./pages/career/Home"));
const Portfolio = lazy(() => import("./pages/portfolio/Portfolio"));
const HobbiesHome = lazy(() => import("./pages/hobbies/HobbiesHome"));
const Workshop = lazy(() => import("./pages/workshop/Workshop"));
const WorkshopCertificate = lazy(() => import("./pages/workshop/Certificate"));
const WorkshopTerms = lazy(() => import("./pages/workshop/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));

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
      path: "/hobbies",
      Component: HobbiesHome,
    },
    {
      path: "/workshop",
      Component: Workshop,
    },
    {
      path: "/workshop/terms",
      Component: WorkshopTerms,
    },
    {
      path: "/privacy",
      Component: Privacy,
    },
    {
      path: "/workshop/certificate/:id",
      Component: WorkshopCertificate,
    },
    {
      path: "/portfolio/catlady",
      Component: Portfolio,
    },
  ],
  { basename: "/" }
);
