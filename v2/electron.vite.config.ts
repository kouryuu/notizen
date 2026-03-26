import path from "path"
import { defineConfig } from "electron-vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  main: {
    build: {
      outDir: "dist-electron/main",
      rollupOptions: {
        input: "electron/main.ts",
        external: ["electron"],
      },
    },
  },
  preload: {
    build: {
      outDir: "dist-electron/preload",
      rollupOptions: {
        input: "electron/preload.ts",
        external: ["electron"],
      },
    },
  },
  renderer: {
    root: ".",
    build: {
      outDir: "dist-electron/renderer",
      rollupOptions: {
        input: "index.html",
      },
    },
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
})
