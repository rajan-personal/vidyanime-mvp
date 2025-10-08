import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
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
  // Base path for GitHub Pages (update this with your repository name)
  basePath: process.env.NODE_ENV === 'production' ? '/vidyanime-mvp' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/vidyanime-mvp/' : '',
};

export default nextConfig;
