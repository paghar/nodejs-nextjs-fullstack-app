/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#e6005c",
          "primary-hover": "#cc0052",
          light: "#f5f5f5",      // alias for gray-100
          inverse: "#ffffff",    // alias for white
        },
      },
    },
    plugins: [],
  };
  