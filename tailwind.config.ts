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
        // Deep navy — authoritative civic institution tone
        navy: {
          50:  '#f0f3f9',
          100: '#dce4f2',
          200: '#b9c9e6',
          300: '#8ea9d5',
          400: '#6285c0',
          500: '#4267ac',
          600: '#324e91',
          700: '#243972',
          800: '#182853',
          900: '#0f1a36',
          950: '#080e1e',
        },
        // Warm gold — tradition, dignity
        gold: {
          50:  '#fdf8ed',
          100: '#f9efd0',
          200: '#f2d99e',
          300: '#e8be65',
          400: '#dc9f33',
          500: '#c9891f',
          600: '#a86d17',
          700: '#885415',
          800: '#6d4015',
          900: '#593414',
        },
        // Warm stone neutrals
        stone: {
          50:  '#fafaf9',
          100: '#f5f5f3',
          200: '#e8e6e3',
          300: '#d4d0cb',
          400: '#a8a19a',
          500: '#797169',
          600: '#5a5249',
          700: '#443d37',
          800: '#2d2824',
          900: '#1c1916',
          950: '#0d0b09',
        },
        // Warm cream backgrounds
        cream: '#fdf9f2',
      },

      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        serif: [
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        ],
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },

      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },

      boxShadow: {
        'card':    '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'card-md': '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'card-lg': '0 10px 20px -4px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.04)',
        'card-hover': '0 16px 32px -8px rgb(0 0 0 / 0.12), 0 6px 12px -4px rgb(0 0 0 / 0.06)',
        'inner-sm': 'inset 0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'gold-glow': '0 0 0 3px rgb(201 137 31 / 0.20)',
      },

      typography: {
        DEFAULT: {
          css: {
            color: '#2d2824',
            a: { color: '#243972', textDecoration: 'underline' },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
