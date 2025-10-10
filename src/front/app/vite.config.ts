import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/modules': path.resolve(__dirname, './src/modules'),
      '@/shared': path.resolve(__dirname, './src/shared'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
