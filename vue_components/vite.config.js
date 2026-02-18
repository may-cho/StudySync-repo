import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    }),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: path.resolve(__dirname, "../static/vue/"),
    emptyOutDir: true,
    lib: {
      entry: "src/main.js",
      formats: ["es"],
    },
  },
  rollupOptions: {
    output: {
      entryFileNames: "[name].js",
      chunkFileNames: "chunks/[name].[hash].js",
      assetFileNames: "assets/[name].[ext]",
    },
  },
});
