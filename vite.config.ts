import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/raqper/",
  root: ".",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "docs",
    assetsDir: "assets",
  },
  assetsInclude: ["**/*.svg", "**/*.csv"],
  preview: {
    port: 5173,
    host: true,
    strictPort: false,
  },
});
