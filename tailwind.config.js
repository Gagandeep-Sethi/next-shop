/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  daisyui: {
    themes: ["light"],
  },
  theme: {
    extend: {
      colors: {
        customColor: "#f97316",
      },
      fontFamily: {
        space: ["var(--font-space-mono)"],

        // Include other font families if needed
      },
    },
    truncate: {
      ellipsis: "...",
      // Add more truncate settings if needed
    },
  },
  plugins: [daisyui],
};
