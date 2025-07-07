import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/bklyn-thread',
  assetPrefix: '/bklyn-thread/',
  images: {
    unoptimized: true
  },
};

export default nextConfig;
