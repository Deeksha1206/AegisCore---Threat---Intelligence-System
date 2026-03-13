/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: "#020617",
        card: "#0f172a",
        neon: "#38bdf8"
      }
    },
  },
  plugins: [],
}