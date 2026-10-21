/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6EDF5',
          100: '#C1D0E8',
          200: '#8DA9D1',
          300: '#5A82BA',
          400: '#3A5E9C',
          500: '#1A3F7A',
          600: '#122F5C',
          700: '#0A2540',
          800: '#081D33',
          900: '#051426',
        },
        secondary: {
          50: '#E6F7F5',
          100: '#B8EDE8',
          200: '#7FDCD4',
          300: '#45CABF',
          400: '#1EB8AD',
          500: '#00A896',
          600: '#008F7E',
          700: '#007565',
          800: '#005C50',
          900: '#00423A',
        },
        accent: {
          50: '#FFF1EB',
          100: '#FFD9C7',
          200: '#FFB89A',
          300: '#FF9A6E',
          400: '#FF804F',
          500: '#FF6B35',
          600: '#E55525',
          700: '#C04418',
          800: '#993614',
          900: '#732A11',
        },
        sand: {
          50: '#FFFDF9',
          100: '#FFF9F0',
          200: '#FDF0DE',
          300: '#F5E2C8',
        },
        success: {
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
        },
        warning: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'scroll-x': 'scrollX 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        scrollX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
