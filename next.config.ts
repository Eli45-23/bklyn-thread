import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/bklyn-thread',
  assetPrefix: '/bklyn-thread/',
};

export default nextConfig;
