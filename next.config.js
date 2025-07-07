/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/bklyn-thread',
  assetPrefix: '/bklyn-thread/',
  images: {
    unoptimized: true
  },
  distDir: 'out'
};

module.exports = nextConfig;