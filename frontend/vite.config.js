import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import polyfillNode from "rollup-plugin-polyfill-node"
//import { nodePolyfills } from "vite-plugin-node-polyfills"

export default defineConfig({
  plugins: [react({
      jsxRuntime : "automatic"
  }),
          polyfillNode({
            include : ['crypto','stream','process']
          }),
    
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      crypto:"crypto-browserify",
      stream:"stream-browserify",
      process:"process/browser",
      "react/jsx-runtime": path.resolve(__dirname, "node_modules/react/jsx-runtime.js"),
      "react/jsx-dev-runtime": path.resolve(__dirname, "node_modules/react/jsx-dev-runtime.js")
    },
  },
  define : {
    "process.env" : {}
  },
  optimizeDeps : {
    include : ["crypto-browserify","stream-browserify","process",
      "react/jsx-runtime",
      "react/jsx-dev-runtime"
    ],
  },
  esbuild : {
    jsx : "automatic",
  }

})
