import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    'maath',
    'react-vertical-timeline-component',
    'react-tilt',
    'leva',
  ],
  // Add any other R3F-related packages here],
  experimental: {
    turbopack: {
      // Add this to resolve font loading issues
      loaders: {
        '.woff2': 'file',
      },
    },
  },
};

export default nextConfig;
