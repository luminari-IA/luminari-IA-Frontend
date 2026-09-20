import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5420,
    strictPort: false, // si 5420 está ocupado, busca el siguiente libre hasta 5430
  },
})
