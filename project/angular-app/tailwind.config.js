module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        colorwhite: {
          100: "#ffffff",
        },
      },
      fontFamily: {
        'funnel': ['Funnel Display', 'Helvetica', 'sans-serif'],
        'degular': ['Degular', 'Helvetica', 'sans-serif'],
        'proxima': ['Proxima Nova', 'Helvetica', 'sans-serif'],
        'albert': ['Albert Sans', 'Helvetica', 'sans-serif'],
        'urbanist': ['Urbanist', 'Helvetica', 'sans-serif'],
        'inter': ['Inter', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
