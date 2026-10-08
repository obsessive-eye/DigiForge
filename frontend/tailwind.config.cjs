// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: '#0a0f2c',
        cyan: '#00f0ff',
        grayLight: '#cbd5e1',
      },
    },
  },
  plugins: [],
};
