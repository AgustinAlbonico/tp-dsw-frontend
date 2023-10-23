/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Saira',
    },
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    backgroundImage: {
      hero: 'url("/src/assets/hero.png")',
      hero2: 'url("/src/assets/hero2.png")',
    },
  },
  plugins: [],
}
