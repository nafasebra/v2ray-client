/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light': {
          'green': '#96e0da',
          'pink': '#eaccf8',
          'purple': '#937ef3'
        }
      }
    },
  },
  plugins: [],
}

