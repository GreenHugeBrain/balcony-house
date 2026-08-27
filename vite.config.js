import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from /balcony-house/ on GitHub Pages; dev stays at the root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/balcony-house/' : '/',
  plugins: [react()],
  server: { port: 5181 },
}))
