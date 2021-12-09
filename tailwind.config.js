module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: "Poppins, sans-serif",
      sora: "Sora, sans-serif",
    },
    extend: {
      colors: {
        "npm-blue": "#F1F3F6",
        "npm-black": "#222B37",
      },
      width: {
        "npm-width": "460px",
      },
      height: {
        "npm-height": "470px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
