import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'abs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'video.twimg.com',
      },
      {
        protocol: 'https',
        hostname: '*.twimg.com',
      }
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // Configure source maps
    if (dev) {
      // In development, use a simpler source map configuration
      config.devtool = 'source-map';
    } else {
      // Disable source maps in production
      config.devtool = false;
    }
    
    // Reduce logging noise
    config.infrastructureLogging = {
      level: 'error'
    };

    return config;
  },
  // Remove swcMinify as it's not a recognized option
  reactStrictMode: true,
};

export default nextConfig;
