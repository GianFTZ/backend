import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    exclude: ["node_modules", "dist"],
    threads: true,
  },
  plugins: [tsconfigPaths()],
})