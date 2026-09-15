import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes every asset path relative, so the build works on
// https://<user>.github.io/ and on https://<user>.github.io/<repo>/ without changes.
export default defineConfig({
  plugins: [react()],
  base: './',
})
