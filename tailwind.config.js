/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./app/templates/**/*.{html,htm}", // Adjust according to your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        industry: ['"industry"', 'sans-serif'], // Define the custom font family
      },
    },
  },
  plugins: [],
};
