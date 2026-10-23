import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const pages = readdirSync(resolve(import.meta.dirname, 'pages'))
  .filter((file) => file.endsWith('.html'))
  .map((file) => resolve(import.meta.dirname, 'pages', file))

export default defineConfig({
  base: '/404-Light-not-found-/',
  build: {
    rollupOptions: {
      input: [resolve(import.meta.dirname, 'index.html'), ...pages],
    },
  },
})
