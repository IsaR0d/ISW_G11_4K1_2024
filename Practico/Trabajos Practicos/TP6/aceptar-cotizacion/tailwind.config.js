/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0077B6',
        primaryLight: '#00B4D8',
        secondary: '#03045E',
        accent: '#90E0EF',
        accentLight: "#CAF0F8",
        accentDark: '#00B4D8'
      },
    },
  },
  plugins: [],
}

