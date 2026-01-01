/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // PlayCast Dark Theme Colors
        'bg-primary': '#0F0F0F',
        'bg-secondary': '#181818',
        'bg-hover': '#2A2A2A',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B3B3B3',
        'accent': '#FF4747',
        'accent-hover': '#E63946',
        'border': '#2A2A2A',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}