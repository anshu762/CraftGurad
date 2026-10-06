/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F6F1E9',      // warm neutral background
        paper: '#FBF8F3',
        charcoal: '#2A2520',   // dark charcoal typography
        clay: '#8C5A42',       // muted natural textile tone
        indigo: '#3B4A5A',     // kasuti thread tone
        terracotta: '#A3432F', // restrained accent
        line: '#DDD3C2',       // thin borders
        mute: '#6E645A',
      },
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wide2: '0.18em',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
};