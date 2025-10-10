import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vite executes this config in an ESM context (package.json => "type": "module"),
 * so Node's __dirname helper is unavailable. We derive the source directory path
 * from import.meta.url + fileURLToPath to keep the "@" alias stable in dev and
 * production builds without relying on CommonJS globals.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
