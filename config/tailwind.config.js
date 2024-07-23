const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./public/*.html",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
    "./app/views/**/*.{erb,haml,html,slim}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: "#2189fd",
          400: "#4c9ffd",
          300: "#76b5fd",
          200: "#a1cbfd",
          100: "#cce1fd",
        },
        darkBlue: {
          500: "#190933",
          400: "#311650",
          300: "#49336c",
          200: "#614189",
          100: "#7a5ea6",
        },
        cream: {
          500: "#ebe9c4",
          400: "#f1eecf",
          300: "#f6f2db",
          200: "#faf7e6",
          100: "#fdfbed",
        },
        green: {
          500: "#39c54f",
          400: "#60d26b",
          300: "#87df87",
          200: "#aeeaa3",
          100: "#d5f5bf",
        },
        red: {
          500: "#f65524",
          400: "#f87549",
          300: "#fa9570",
          200: "#fcb696",
          100: "#fed7bd",
        },
        white: {
          500: "#f7f6e7",
          400: "#f8f7ec",
          300: "#f9f8f0",
          200: "#faf9f4",
          100: "#fbfaf8",
        },
      },
      fontFamily: {
        "header-font": ["Newsreader", "serif"],
        "body-font": ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};
