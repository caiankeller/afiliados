// VITE PLUGIN NODE STUFF, TO LEARN MORE, CHECK https://www.npmjs.com/package/vite-plugin-node
// thank you

import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
  server: {
    port: 1707,
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "/src/app.ts",
      exportName: "viteNodeApp",
      tsCompiler: "esbuild",
      swcOptions: {},
    }),
  ],
  optimizeDeps: {},
});
