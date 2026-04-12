import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'perufrost.com',
      },
      {
        protocol: 'http',
        hostname: '76.13.224.112',
      },
      {
        protocol: 'https',
        hostname: '76.13.224.112',
      },
    ],
  },
  // Allow large video assets
  experimental: {
    largePageDataBytes: 128 * 1024,
  },
};

export default nextConfig;
