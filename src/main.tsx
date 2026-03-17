import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "@/app/routes";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div className="min-h-screen w-full" aria-hidden />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
