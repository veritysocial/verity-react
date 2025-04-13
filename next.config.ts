import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow profile images from clerk
    remotePatterns: [new URL('https://img.clerk.com/**')],
  },
};

export default nextConfig;
