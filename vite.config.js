import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import * as process from 'process'  // ✅ ADD THIS LINE

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (dev/prod)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      port: 5173, // For local dev
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_URL || 'http://localhost:9096',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    define: {
      'import.meta.env.VITE_BACKEND_URL': JSON.stringify(env.VITE_BACKEND_URL),
      'import.meta.env.REACT_APP_BACKEND_URL': JSON.stringify(env.REACT_APP_BACKEND_URL),
    },
  }
})
