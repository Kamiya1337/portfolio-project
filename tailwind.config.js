/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        academic: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          800: '#1e40af',
          900: '#1e3a8a', // Màu xanh học thuật chủ đạo
        }
      }
    },
  },
  plugins: [],
}