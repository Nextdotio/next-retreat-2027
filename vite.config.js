import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/next-retreat-2027/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
