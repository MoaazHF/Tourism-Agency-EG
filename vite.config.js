import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// rollup visualizer plugin is optional and may not be installed in all environments

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    // visualizer plugin omitted by default to keep dev onboarding friction-free
  ],
  build: {
    rollupOptions: {
      output: {
        // Use a function-based manualChunks to be compatible with Vite/Rollup version
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
