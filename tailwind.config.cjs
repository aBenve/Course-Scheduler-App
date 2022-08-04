function generateNumberPairs(from, to) {
  return Object.fromEntries(Array(to - from).fill().map((_, i) => i + from).map(n => [String(n), String(n)]))
}

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily:{
        "principal": ["Poppins", "sans-serif"],
      },
      fontSize:{
        'xxs': ['0.5rem', {lineHeight: '0.5rem'}],
      },
      gridRowStart: {
        ...generateNumberPairs(7, 40)
      },
      gridRowEnd: {
        ...generateNumberPairs(7, 40)
      },
      colors:{
        'background': '#e5e7eb',
        'background-dark': '#191919',
        'area': '#f3f4f6',
        'area-dark': '#202020',
        'zone': '#ffffff',
        'zone-dark': '#2c2c2c',
        'zone-secondary': '#f8f8f8',
        'zone-secondary-dark': '#383838',
        'zone-terciary': '#d1d5db',
        'zone-terciary-dark': '#3f3f3f',


        'text-dark': '#161616',
        'text-dark-secondary': '#383838',
        'text': '#a9a9a9',
        'text-secondary': '#9b9b9b',

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

module.exports = config;
