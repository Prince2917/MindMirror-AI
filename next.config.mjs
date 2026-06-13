/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Required for Netlify plugin compatibility
    serverActions: {
      bodyParserSizeLimit: '2mb',
    },
  },
}

export default nextConfig
