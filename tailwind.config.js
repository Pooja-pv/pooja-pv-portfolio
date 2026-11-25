/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#12060B', garnet: '#2A0C18', champagne: '#E9D5A8', gold: '#D4A74A',
        brass: '#B8862F', ivory: '#F7EFE2', mauve: '#A89A9A', noir: '#0B0306'
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Instrument Serif', 'serif'],
        mono: ['IBM Plex Mono', 'monospace']
      }
    }
  },
  plugins: []
}
