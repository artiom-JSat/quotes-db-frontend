/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './app/(routes)/**/*.{js,ts,jsx,tsx}', // 👈 ЭТО ОБЯЗАТЕЛЬНО
    './app/_components/**/*.{js,ts,jsx,tsx}',
    './app/_utils/**/*.{js,ts,jsx,tsx}',
    './app/_config/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
