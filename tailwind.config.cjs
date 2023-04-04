/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        'lg-card': '25rem',
        'sm-card': '50rem',
      },
    },
  },
  plugins: [],
};
