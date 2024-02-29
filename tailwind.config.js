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
        primary: '#FF6154'
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
        },
        'heart-burst': {
          from: {
            backgroundPosition: 'left'
          },
          to: {
            backgroundPosition: 'right'
          }
        }
      },
      animation: {
        'toast-open': 'toast-open 0.6s linear',
        'heart-burst': 'heart-burst 0.8s steps(28) 1'
      },
      backgroundImage: {
        'diagonal-lines': `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233f3f46' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`
      }
    }
  }
}
