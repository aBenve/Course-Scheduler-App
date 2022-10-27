import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import wasmPack from "vite-plugin-wasm-pack";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [wasmPack([], ["@course-scheduler-app/scheduler-wasm"]), svelte()],
  resolve: {
    alias: {
      "scheduler-wasm": "@course-scheduler-app/scheduler-wasm",
    },
  },
});
