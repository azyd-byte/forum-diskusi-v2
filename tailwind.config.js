module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        loadingBar: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "loading-bar": "loadingBar 2s ease-in-out infinite",
      },
    },
  },

  plugins: [],
};
