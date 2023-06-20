/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './containers/**/*.{js,ts,jsx,tsx,mdx}',
    './templates/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': ['10px', '1.25']
      },
      colors: {
        primary: '#da552f'
      },
      keyframes: {
        'toast-open': {
          from: {
            opacity: 0,
            transform: 'translateX(3000px)'
          },
          '60%': {
            opacity: 1,
            transform: 'translateX(-25px)'
          },
          '75%': {
            transform: 'translateX(10px)'
          },
          '90%': {
            transform: 'translateX(-5px)'
          },
          to: {
            transform: 'none'
          }
        }
      },
      animation: {
        'toast-open': 'toast-open 0.6s linear'
      }
    }
  },
  plugins: [require('prettier-plugin-tailwindcss')]
}
