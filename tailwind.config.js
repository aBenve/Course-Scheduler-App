import colors from 'tailwindcss/colors.js'

function generateNumberPairs(from, to) {
  return Object.fromEntries(Array(to - from).fill().map((_, i) => i + from).map(n => [String(n), String(n)]))
}

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        "principal": ["Poppins", "sans-serif"],
      },
      fontSize: {
        'xxs': ['0.5rem', { lineHeight: '0.5rem' }],
      },
      gridRowStart: {
        ...generateNumberPairs(7, 40)
      },
      gridRowEnd: {
        ...generateNumberPairs(7, 40)
      },
      colors: {
        'background': colors.gray[200],
        'background-dark': '#191919',
        'area': colors.gray[100],
        'area-dark': '#202020',
        'zone': colors.gray[50],
        'zone-dark': '#2c2c2c',
        'zone-secondary': '#e8e8e8',
        'zone-secondary-dark': '#383838',
        'zone-terciary': colors.gray[300],
        'zone-terciary-dark': '#3f3f3f',

        'accent': '#5375F3',
        'accent-dark': '#4865D1',

        'text-dark': '#161616',
        'text-dark-secondary': '#383838',
        'text': '#a9a9a9',
        'text-secondary': '#9b9b9b',
        'text-terciary': '#6b7280',

        'vertex': colors.gray[300],
        'vertex-dark': '#525252',

        'vertex-ring': colors.gray[200],
        'vertex-ring-dark': '#191919',

        'edge': '#C5C9CE',
        'edge-dark': '#3f3f3f',



      },
      maxHeight: {
        "1/5": "20%"
      },

    }
  },
  safelist: [
    {
      pattern: /(row|col)-(start|end|span)-.+/,
    },
    {
      pattern: /bg-\[#[a-f0-9]+\]/
    }
  ],
  plugins: [],
};

export default config;