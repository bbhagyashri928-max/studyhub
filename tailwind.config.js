/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#14243A', // Primary Midnight Navy
          950: '#0B1522',
        },
        ivory: {
          50: '#FFFFFF',
          100: '#FAF9F5',
          200: '#F8F6F0', // Soft Ivory background
          300: '#EDE9DE',
          400: '#DFD8C8',
          500: '#C9BEA8',
        },
        teal: {
          50: '#E6FAF8',
          100: '#C1F3ED',
          200: '#97EBE1',
          300: '#6CE2D4',
          400: '#45D8C7',
          500: '#24B8A6', // Electric Teal
          600: '#1D9A8B',
          700: '#17796D',
          800: '#115B52',
          900: '#0B3B35',
        },
        coral: {
          50: '#FEF3F0',
          100: '#FDE2DB',
          200: '#FBC7B9',
          300: '#F8A995',
          400: '#F48E75',
          500: '#F08068', // Warm Coral
          600: '#DB6248',
          700: '#B8472F',
          800: '#8C3421',
          900: '#5F2215',
        },
        lavender: {
          50: '#F6F5FB',
          100: '#ECE9F7',
          200: '#DBD6F0',
          300: '#C5BFE7',
          400: '#B4ABDF',
          500: '#AAA2D5', // Muted Lavender
          600: '#8F85C5',
          700: '#756BB1',
          800: '#5C5296',
          900: '#443C73',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#687587', // Slate Gray
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px rgba(20, 36, 58, 0.05), 0 1px 2px rgba(20, 36, 58, 0.03)',
        'soft': '0 4px 12px rgba(20, 36, 58, 0.06), 0 1px 3px rgba(20, 36, 58, 0.04)',
        'soft-md': '0 8px 24px rgba(20, 36, 58, 0.08), 0 2px 6px rgba(20, 36, 58, 0.04)',
        'soft-lg': '0 16px 36px rgba(20, 36, 58, 0.10), 0 4px 12px rgba(20, 36, 58, 0.05)',
      }
    },
  },
  plugins: [],
}
