import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages project site (e.g. https://user.github.io/repo-name/) set:
//   VITE_BASE_PATH=/repo-name/
// For user/org site (https://user.github.io/) leave unset (default '/').
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    // Use "static" so deployed repo’s .gitignore (which often ignores /assets) doesn’t drop built files
    assetsDir: 'static',
  },
})
