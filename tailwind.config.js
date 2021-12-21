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
        f1f3f6: "#f1f3f6",
        "222b37": "#222b37",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
