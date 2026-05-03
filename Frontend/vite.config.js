import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Whenever you use axios.get("/notes"), it will redirect to your local backend
      '/notes': 'http://localhost:3000',
    },
  },
})
