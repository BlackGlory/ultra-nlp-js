import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths()
  ]
// , optimizeDeps: {
//     exclude: [
//       './native/index.node'
//     ]
//   }
// , build: {
//     rollupOptions: {
//       external: [
//         './native/index.node'
//       ]
//     }
//   }
})
