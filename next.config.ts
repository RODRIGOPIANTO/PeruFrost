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
        protocol: 'https',
        hostname: 'rywzpyzdyxzdhivjlclm.supabase.co',
      },
    ],
  },
  // Allow large video assets
  experimental: {
    largePageDataBytes: 128 * 1024,
  },
};

export default nextConfig;
