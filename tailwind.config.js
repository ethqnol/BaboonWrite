/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e2b714',
        background: '#1a1a1a',
        surface: '#2a2a2a',
        text: '#d1d5db',
        muted: '#9ca3af',
        error: '#ef4444',
        success: '#10b981',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}