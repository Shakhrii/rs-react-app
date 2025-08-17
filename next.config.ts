import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: 'build',
};

module.exports = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
};

export default nextConfig;
