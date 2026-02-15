import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/debby/', // Sesuaikan dengan nama repo baru
  define: {
    'process.env': {}
  }
})
