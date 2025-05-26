// app/fonts.ts or lib/fonts.ts

// Define the General Sans font with all weights/styles

import { Inter, Orbitron, Ubuntu } from 'next/font/google';
export const inter = Inter({ subsets: ['latin'] });
export const orbitron = Orbitron({
  weight: '400', // This is the only available weight
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-codystar',
});
export const ubuntu = Ubuntu({
  weight: ['400', '500', '700'], // This is the only available weight
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-codystar',
});
