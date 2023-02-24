/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width: {
        '200px': '200px',
        '400px': '400px',
        '500px': '500px',
        '600px': '600px',
      },
      minWidth: {
        '300px': '300px',
      }
    }
  },
  plugins: [],
}
