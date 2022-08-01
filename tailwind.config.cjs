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
        'background-dark': '#161616',
        'area': '#f3f4f6',
        'area-dark': '#212121',
        'zone': '#ffffff',
        'zone-dark': '#272727',
        'zone-secundary': '#f8f8f8',
        'zone-secundary-dark': '#303030',
        'text': '#161616',
        'text-dark': '#e5e7eb',
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
