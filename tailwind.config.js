/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsc,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pimary: '#ff0000',
        secondary: '#ff0080',
      },
    },
  },
  plugins: [],
}
