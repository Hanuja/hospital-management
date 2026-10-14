/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-blue': '#0F4C81',
        'medical-teal': '#16A3A8',
        'navy-blue': '#0F172A',
        primary: {
          DEFAULT: '#0F4C81',
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#0F4C81',
          600: '#0A3860',
          700: '#0F172A',
          hover: '#0A3860',
          light: '#EFF6FF',
        },
        secondary: {
          DEFAULT: '#16A3A8',
          500: '#16A3A8',
          600: '#0F766E',
          hover: '#0F766E',
          light: '#F0FDFA',
        },
        accent: {
          DEFAULT: '#22C55E',
          500: '#22C55E',
          600: '#16A34A',
          hover: '#16A34A',
          light: '#F0FDF4',
        },
        emergency: {
          DEFAULT: '#DC2626',
          hover: '#B91C1C',
        },
        medical: {
          blue: '#0F4C81',
          teal: '#16A3A8',
          green: '#22C55E',
          red: '#DC2626',
          navy: '#0F172A',
          gray: '#64748B',
          bg: '#F8FAFC',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(15, 76, 129, 0.08)',
        'glass': '0 8px 32px 0 rgba(15, 76, 129, 0.12)',
        'premium': '0 20px 50px -12px rgba(15, 76, 129, 0.15)',
      }
    },
  },
  plugins: [],
}
