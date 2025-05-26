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
  // Remove the turbopack configuration from experimental
  // Turbopack is now enabled via CLI flag: --turbopack
};

export default nextConfig;
