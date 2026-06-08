/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#171817',
        muted: '#666966',
        canvas: '#f7f7f5',
        panel: '#ffffff',
        soft: '#efefec',
        line: '#deded9',
        emerald: '#087a55',
        'emerald-soft': '#e2f3eb',
        amber: '#9a5b08',
        'amber-soft': '#fff1d6',
        danger: '#b42318',
        'danger-soft': '#fee9e7',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        ambient: '0 12px 32px rgba(23, 24, 23, 0.06)',
        lift: '0 18px 40px rgba(23, 24, 23, 0.09)',
      },
    },
  },
  plugins: [],
};
