import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Asegura que las rutas de los archivos sean relativas
  plugins: [react()],
})
