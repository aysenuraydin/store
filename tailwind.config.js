/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        deneme: {
          111: 'pink'
        }
      },
      rotate: {
        '-135': '-135deg',
      },

    }
  },
  plugins: [
    plugin(function({ addUtilities, theme }) {

      const newUtilities = {
        '.backface-hidden': { 'backface-visibility': 'hidden' }
      };
      addUtilities({ ...newUtilities });
    })
  ]
};
