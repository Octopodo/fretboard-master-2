/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-|border-/, // 👈  This includes bg of all colors and shades
    },
  ],
}

