/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ...
        primary: {
          DEFAULT: "rgb(241,93,34)",
        },
        secondary: {
          page: "#eeeeee",
          section: "#F7F6F6",
          table: "#EBEBEB",
        },
      },
    },
  },
  plugins: [],
};
