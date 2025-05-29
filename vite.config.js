import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // OR use '0.0.0.0'
  },
  plugins: [react(), tailwindcss()],
  base: "/sudoku-blitz/", // Replace with your repository name
});
