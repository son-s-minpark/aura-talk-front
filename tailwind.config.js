/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pointBlue: "#6EABFF",
        pointPurple: "#8045FF",
        darkBg: "#2A2A2A",
      },
    },
  },
  plugins: [],
  darkMode: ["class"],
};
