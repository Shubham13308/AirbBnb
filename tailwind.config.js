/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}', // ⬅️ Add this if you use a components folder
    './pages/**/*.{js,ts,jsx,tsx}', // ⬅️ Optional, if you're using pages
  ],
  theme: {
    extend: {
      animation: {
        typing: 'typing 3s steps(30, end) infinite',
        pulseSlow: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
      },
      colors: {
        airbnbPink: '#FF5A5F',
        airbnbLight: '#F7F7F7',
      },
    },
  },
  plugins: [],
}
