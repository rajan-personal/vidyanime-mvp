import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dpsjhakri.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'worldarchitecture.org',
        pathname: '/imgcache/**',
      },
      {
        protocol: 'https',
        hostname: 'www.dpsmathuraroad.org',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
