/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        allura: ["Allura", "cursive"],
      },
      colors: {
        bg: "#0d0f12",
        card: "#151922",
        ink: "#e8ebef",
        inkMuted: "#a8b0bc",
        accent: "#8ab4ff"
      },
      borderRadius: { xl2: "1.25rem" }
    }
  },
  plugins: [],
};
