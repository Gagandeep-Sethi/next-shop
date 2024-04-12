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

  plugins: [daisyui],
};
