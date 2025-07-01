/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // If your main HTML is in the root
    "./src/**/*.{js,ts,jsx,tsx,vue}", // If you're using a framework like React, Vue, Svelte
    "./*.html", // To include any HTML files directly in the root
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}