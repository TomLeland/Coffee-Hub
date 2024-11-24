/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: '#8B2635', // Deep burgundy
          light: '#B54B59',   // Lighter burgundy
          dark: '#6B1D29',    // Darker burgundy
        },
        // Accent Colors
        accent: {
          red: '#E15B64',     // Vibrant red
          pink: '#F49CAC',    // Soft pink
          blue: '#8C9DB5',    // Slate blue
          gray: '#F0F1F5',    // Light gray
        },
        // Status Colors
        status: {
          success: '#4CAF50',
          warning: '#FFA726',
          error: '#EF5350',
          info: '#42A5F5',
        },
        // Surface Colors
        surface: {
          DEFAULT: '#FFFFFF',    // White surface
          secondary: '#F8F7F9',  // Light gray surface
          accent: '#F5F1EA',     // Warm cream
          muted: '#E8E7E9',      // Muted gray
        },
        // Text Colors
        text: {
          primary: '#1A1523',    // Near black
          secondary: '#6B697A',  // Medium gray
          muted: '#908E99',      // Light gray
        },
        // Border Colors
        border: {
          DEFAULT: '#E2E1E5',    // Light border
          accent: '#D2D1D5',     // Dark border
        },
        // Chart Colors
        chart: {
          primary: '#E15B64',    // Main chart color
          secondary: '#8C9DB5',  // Secondary chart color
          accent: '#F49CAC',     // Accent chart color
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}