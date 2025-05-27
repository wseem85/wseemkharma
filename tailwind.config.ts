import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        generalsans: ['General Sans', 'sans-serif'],
      },
      screens: {
        xxs: '320px', // Extra small phones
        xs: '480px', // Small phones
        sm: '640px', // Large phones / small tablets
        md: '768px', // Tablets
        lg: '1024px', // Small laptops
        xl: '1280px', // Laptops
        '2xl': '1536px', // Large screens
        '3xl': '1920px', // Extra large screens
      },
      colors: {
        black: {
          DEFAULT: '#000',
          100: '#010103',
          200: '#0E0E10',
          300: '#1C1C21',
          500: '#3A3A49',
          600: '#1A1A1A',
          backone: '#1e1e1e',
          backtwo: '#252526',
        },
        white: {
          DEFAULT: '#FFFFFF',
          800: '#E4E4E6',
          700: '#D6D9E9',
          600: '#AFB0B6',
          500: '#62646C',
        },
        red: {
          ground: '#96001e',
          groundlight: '#c50027',
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/herobg.png')",
      },
      boxShadow: {
        'white-sm': '0 2px 4px -1px rgba(255, 255, 255, 0.5)',
        'white-lg': '0 10px 15px -3px rgba(255, 255, 255, 0.7)',
      },
      animation: {
        ping: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
