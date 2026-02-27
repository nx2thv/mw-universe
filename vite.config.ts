import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const requiredEnv = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY']
  const missingEnv = requiredEnv.filter((key) => !env[key])

  if (missingEnv.length > 0) {
    throw new Error(
      `Missing required env vars: ${missingEnv.join(', ')}. Set them in your deploy provider and .env.local for local dev.`,
    )
  }

  return {
    plugins: [react()],
    server: {
      host: '127.0.0.1',
      port: 5173,
    },
  }
})
