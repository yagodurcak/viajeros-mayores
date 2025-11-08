/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Category colors for blog
    'bg-blue-600',
    'bg-emerald-600',
    'bg-amber-600',
    'bg-purple-600',
    'bg-orange-600',
    // Category colors for news
    'bg-indigo-600',
    'bg-rose-600',
    'bg-teal-600',
    // Legacy colors
    'bg-blue-500',
    'bg-green-500',
    'bg-indigo-500',
    'bg-pink-500',
  ],
  theme: {
    extend: {
      fontFamily: {
        alata: ['var(--font-alata)', 'sans-serif'],
        'nunito-sans': ['var(--font-nunito-sans)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
