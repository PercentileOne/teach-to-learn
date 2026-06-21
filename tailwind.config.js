/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:       { DEFAULT: '#0EA5E9', dark: '#0284C7', light: '#E0F2FE' },
        'accent-gold': '#F59E0B',
        'accent-coral':'#F87171',
        'text-dark':   '#0F172A',
        'text-muted':  '#64748B',
        'bg-white':    '#F7F9FC',
        'bg-alt':      '#F0F3F8',
        'bg-blue':     '#EBF4FF',
        'bg-parent':   '#FDF0F0',
        'brand-navy':  '#0369A1',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn:  '50px',
        xl2:  '20px',
        xl3:  '28px',
      },
      boxShadow: {
        card:      '0 4px 24px rgba(0,0,0,0.08)',
        'card-lg': '0 8px 40px rgba(0,0,0,0.14)',
        'blue-sm': '0 4px 16px rgba(14,165,233,0.35)',
        'blue-lg': '0 8px 24px rgba(14,165,233,0.45)',
        'blue-xl': '0 12px 48px rgba(14,165,233,0.22)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(145deg, #0369A1 0%, #0284C7 30%, #0EA5E9 60%, #BAE6FD 88%, #EBF4FF 100%)',
        'blue-gradient': 'linear-gradient(135deg, #0369A1 0%, #0EA5E9 100%)',
        'gold-gradient': 'linear-gradient(135deg, #92400E 0%, #D97706 100%)',
        'dark-screen':   'linear-gradient(160deg, #0D1117 0%, #0A0E1A 100%)',
        'titan-frame':   'linear-gradient(160deg, #8E9BAB 0%, #4A5568 30%, #2D3748 60%, #8E9BAB 100%)',
      },
    },
  },
  plugins: [],
}
