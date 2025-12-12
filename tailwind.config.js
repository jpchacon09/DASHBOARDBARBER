/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
      },
      colors: {
        barber: {
          red: '#dc2626',
          black: '#0f0f0f',
          dark: '#1a1a1a',
          white: '#fafafa',
          gold: '#fbbf24',
          silver: '#d4d4d4',
        },
      },
      backgroundImage: {
        'barber-gradient': 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
        'barber-card': 'linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%)',
        'barber-red-gradient': 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        'barber-gold-gradient': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      },
      boxShadow: {
        'barber': '0 4px 20px rgba(220, 38, 38, 0.3)',
        'barber-gold': '0 4px 20px rgba(251, 191, 36, 0.3)',
        'barber-lg': '0 10px 40px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
