import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const page = (p) => fileURLToPath(new URL(p, import.meta.url))

// A multi-page build: every route is a real HTML file with its own React root,
// so there is no client-side router and no 404 rewrite needed on GitHub Pages.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/balcony-house/' : '/',
  plugins: [react()],
  server: { port: 5181 },
  build: {
    rollupOptions: {
      input: {
        home: page('./index.html'),
        rooms: page('./rooms/index.html'),
        house: page('./house/index.html'),
        gallery: page('./gallery/index.html'),
        book: page('./book/index.html'),
      },
    },
  },
}))
