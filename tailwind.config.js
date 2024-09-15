// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Add your content paths
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#FFF8F1',
          100: '#FEECDC',
          200: '#FCD9B8',
          300: '#F9C594',
          400: '#F7B270',
          500: '#F49E4C',
          600: '#C37E3D',
          700: '#925F2E',
          800: '#623F1F',
          900: '#31100F',
        },
      },
    },
  },
  plugins: [],
};
