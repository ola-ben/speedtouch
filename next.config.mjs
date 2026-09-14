import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      'react-router-dom': './src/lib/router-bridge.js',
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  env: {
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    VITE_PAYSTACK_PUBLIC_KEY: process.env.VITE_PAYSTACK_PUBLIC_KEY || process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    VITE_WHATSAPP_NUMBER: process.env.VITE_WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    VITE_ADMIN_EMAILS: process.env.VITE_ADMIN_EMAILS || process.env.VITE_ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAILS || 'speedtouch@gmail.com',
    VITE_ADMIN_EMAIL: process.env.VITE_ADMIN_EMAIL || process.env.VITE_ADMIN_EMAILS || 'speedtouch@gmail.com',
  },
  webpack: (config, { webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-router-dom': path.resolve(__dirname, 'src/lib/router-bridge.js'),
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''),
        'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''),
        'import.meta.env.VITE_PAYSTACK_PUBLIC_KEY': JSON.stringify(process.env.VITE_PAYSTACK_PUBLIC_KEY || process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ''),
        'import.meta.env.VITE_WHATSAPP_NUMBER': JSON.stringify(process.env.VITE_WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''),
        'import.meta.env.VITE_ADMIN_EMAILS': JSON.stringify(process.env.VITE_ADMIN_EMAILS || process.env.VITE_ADMIN_EMAIL || 'speedtouch@gmail.com'),
        'import.meta.env.VITE_ADMIN_EMAIL': JSON.stringify(process.env.VITE_ADMIN_EMAIL || 'speedtouch@gmail.com'),
        'import.meta.env.DEV': JSON.stringify(process.env.NODE_ENV !== 'production'),
        'import.meta.env.PROD': JSON.stringify(process.env.NODE_ENV === 'production'),
        'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV || 'development'),
      })
    )

    return config
  },
}

export default nextConfig
