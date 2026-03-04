import { defineConfig } from "vite"; // Fixed: must be 'vite'
import vue from "@vitejs/plugin-vue";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "/static/vue",
  // Replaces 'process.env.NODE_ENV' with a string so the browser doesn't crash
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [
    vue({
      customElement: true,
      template: {
        compilerOptions: {
          // Allows you to use <nav-bar> in Django without Vue complaining
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    }),
    // Re-copies fonts after the 'emptyOutDir' wipe
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@fortawesome/fontawesome-free/webfonts/*",
          dest: "webfonts",
        },
      ],
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, "../static/vue/"),
    emptyOutDir: true,
    // Forces real font files instead of Base64 text
    assetsInlineLimit: 0,
    lib: {
      entry: path.resolve(__dirname, "src/main.js"),
      name: "VueComponents",
      formats: ["es"],
      fileName: () => `vue_components.mjs`,
    },
    rollupOptions: {
      output: {
        assetFileNames: "vue_components.[ext]",
      },
    },
  },
});
