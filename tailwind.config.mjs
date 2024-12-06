/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      transparent: 'transparent',
      rosewood: '#6F0413',
      crayola: '#F7D971',
      'anti-flash-white': '#F0F0F0',
      'eerie-black': '#1E1E1E',
      'gentian-blue': '#332897',
      zinc: { ...colors.zinc, 1000: '#f0f0f0' },
    },
    fontFamily: {
      gilda: ['GildaDisplay', 'system-ui', 'sans-serif'],
      cutive: ['CutiveMono', 'system-ui', 'sans-serif'],
      thabit: ['Thabit', 'system-ui', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
