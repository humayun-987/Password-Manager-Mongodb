/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,tsx,jsx}',
  ],
  theme: {
    extend: {
      screens: {
        'custom-max': { 'max': '768px' }, // Define your custom max-width breakpoint
      },
    },
  },
  plugins: [],
}

