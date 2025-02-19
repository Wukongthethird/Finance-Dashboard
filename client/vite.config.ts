import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // replaces src dir with
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
