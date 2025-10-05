/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00b67a",
        secondary: "#009e6b",
        accent: "#e6fff4",
        neutral: "#f8fafc",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 6px rgba(0,0,0,0.08)",
        card: "0 4px 12px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
