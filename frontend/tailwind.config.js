/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F7',
        surface: '#FFFFFF',
        'surface-subtle': '#F4F3F0',
        border: '#E5E5E5',
        accent: {
          DEFAULT: '#F28C28',
          hover: '#E07B18',
          subtle: '#FFF5EB',
          border: 'rgba(242, 140, 40, 0.3)',
        },
        delta: {
          positive: '#16A34A',
          'positive-bg': '#F0FDF4',
          negative: '#DC2626',
          'negative-bg': '#FEF2F2',
        },
        text: {
          main: '#171717',
          muted: '#737373',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
}
