/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#B965FC',
        'primary-dark': '#101C3D',
        'primary-pink': '#FB8DA9',
        'primary-cyan': '#4ACEE1',
        'primary-yellow': '#FAD689',
      }
    },
  },
  plugins: [],
}