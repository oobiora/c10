import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  webpack: (config) => {
    config.infrastructureLogging = {
      level: 'error'
    }
    return config;
  }
};

export default nextConfig;
