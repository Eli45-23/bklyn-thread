import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/bklyn-thread',
  assetPrefix: '/bklyn-thread/',
  images: {
    unoptimized: true
  },
  distDir: 'out'
};

export default nextConfig;
