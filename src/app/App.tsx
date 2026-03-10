import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--p-bg-base, #0c0024)" }}>
      <div className="text-[#a89cc8]" style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}>Loading…</div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
