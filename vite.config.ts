import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as path from "path";
import { defineConfig } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import wasmPack from "vite-plugin-wasm-pack";
import postcssConfig from "./postcss.config.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    wasmPack([], ["@course-scheduler-app/scheduler-wasm"]),
    svelte(),
    viteMockServe(),
  ],
  css: {
    postcss: postcssConfig,
  },
  resolve: {
    alias: {
      "scheduler-wasm": "@course-scheduler-app/scheduler-wasm",
      src: path.resolve(__dirname, "./src"),
    },
  },
});
