import { copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

const ROOT = path.dirname(fileURLToPath(import.meta.url));

/** Root index.html is overwritten with production hashes on `npm run build`; restore the dev entry whenever Vite serves (including bare `vite` without `predev`). */
function prepareDevIndexHtml() {
  return {
    name: "prepare-dev-index-html",
    apply: "serve" as const,
    enforce: "pre" as const,
    async buildStart() {
      const template = path.join(ROOT, "src", "index.template.html");
      const target = path.join(ROOT, "index.html");
      await copyFile(template, target);
    },
  };
}

export default defineConfig({
  base: "/",
  root: ".",
  publicDir: false,
  plugins: [prepareDevIndexHtml(), react(), tailwindcss()],
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
