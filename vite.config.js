import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://nicolassequeira11.github.io/mornartcg/",
  plugins: [react()],
})
