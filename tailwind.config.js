/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        night: '#090d18',
        mist: '#f6f9ff',
        sage: '#74c69d',
        gold: '#f7c873',
        sky: '#7dd3fc',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(12, 17, 35, 0.35)',
      },
    },
  },
  plugins: [],
};
