// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        hindi: ['"Yatra One"', 'cursive', 'sans-serif'],
        sans: ['"Poppins"', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive']
      },
    },
  },
  plugins: [],
}