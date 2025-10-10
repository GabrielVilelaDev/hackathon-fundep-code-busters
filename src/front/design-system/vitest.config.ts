/// <reference types="vitest" />
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/**",
        "src/components/ui/",
        "**/dist/**",
        "**/*.config.ts",
        "**/*.config.js",
        "**/*.d.ts",
        "**/index.ts",
        "**/coverage/**",
        "**/build/**"
      ]
    }
  }
});
