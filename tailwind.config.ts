import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './sanity/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — warm, civic, dignified
        navy: {
          50: '#f0f4f9',
          100: '#d9e4f0',
          200: '#b3c9e1',
          300: '#8daed2',
          400: '#6793c3',
          500: '#4178b4',
          600: '#2d5a8e',
          700: '#1e3d61',
          800: '#14293f',
          900: '#0a1520',
          950: '#050b10',
        },
        gold: {
          50: '#fdf9ed',
          100: '#faf0cc',
          200: '#f5e099',
          300: '#efcf66',
          400: '#e9be33',
          500: '#c9a227',
          600: '#a07e1a',
          700: '#785d12',
          800: '#503d0c',
          900: '#281e06',
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#292524',
            a: { color: '#2d5a8e', textDecoration: 'underline' },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
