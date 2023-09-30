const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#006EE6",
        secondary: "#F18701",
      },
      fontFamily: {
        sans: ["Archivo", ...defaultTheme.fontFamily.sans],
        "sans-secondary": ["Syne", ...defaultTheme.fontFamily.sans],
      },
      textColor: "dark-green",
    },
  },
  plugins: [],
};
