import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  root: ".",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    outDir: ".",
    assetsDir: "static",
    emptyOutDir: false,
  },
  assetsInclude: ["**/*.svg", "**/*.csv"],
  preview: {
    port: 5173,
    host: true,
    strictPort: false,
  },
});
