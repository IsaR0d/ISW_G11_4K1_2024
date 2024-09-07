/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#442ae7',
        primaryLight: '#6953f6',
        secondary: '#f0798c',
        secondaryDark: '#ee6279',
        accent: '#ed9a5e',
        accentLight: "#ffe0cb",
        accentDark: '#ff7614'
      },
    },
  },
  plugins: [],
}

