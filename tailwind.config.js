// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        outfit: ["Outfit", "sans-serif"]
      },
      colors:{
        myblue: "#092252"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
