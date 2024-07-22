/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Update this path according to your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  // Other configurations...
}

