/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        polar: {
          darkest: '#070D1E',
          navy: '#0B132B',
          panel: '#111D3B',
          card: '#16254A',
          border: '#1E3566',
          cyan: '#00E5FF',
          blue: '#1E88E5',
          light: '#E2F1F8',
          muted: '#8E9DB8',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.8))' },
          '50%': { opacity: '0.6', filter: 'drop-shadow(0 0 2px rgba(0, 229, 255, 0.3))' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'radar': 'radarSweep 4s linear infinite',
      }
    },
  },
  plugins: [],
}
