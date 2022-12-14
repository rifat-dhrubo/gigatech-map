/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        right_reveal: {
          '0%': { transform: 'translate-x-full' },
          '50%': { transform: 'translate-x-1/2' },
          '100%': { transform: 'translate-x-0' },
        },
      },
      animation: {
        right_reveal: 'right_reveal 1s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
