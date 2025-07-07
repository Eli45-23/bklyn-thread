/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export settings for Render deployment
  // Render supports full Next.js features including SSR and API routes
  images: {
    unoptimized: true // Keep this for now until we set up proper image optimization
  },
  // Enable environment-specific configuration
  env: {
    DEPLOYMENT_ENV: process.env.NODE_ENV
  }
};

module.exports = nextConfig;