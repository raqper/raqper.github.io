import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  root: ".",
  publicDir: false,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    outDir: ".site",
    assetsDir: "static",
    emptyOutDir: true,
  },
  assetsInclude: ["**/*.svg", "**/*.csv"],
  preview: {
    port: 5173,
    host: true,
    strictPort: false,
  },
});
