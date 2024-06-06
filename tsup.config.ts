import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  entry: ["./src/index.ts"],
  dts: true,
  clean: true,
  external: ["react", "react-dom", "zustand"],
  outDir: "./dist",
  skipNodeModulesBundle: true,
  treeshake: true,
  minify: true,
  minifySyntax: true,
  minifyWhitespace: true,
});
