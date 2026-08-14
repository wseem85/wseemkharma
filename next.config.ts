import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

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

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(nextConfig);
