function generateNumberPairs(from, to) {
  return Object.fromEntries(Array(to - from).fill().map((_, i) => i + from).map(n => [String(n), String(n)]))
}

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

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
        'background': '#ffffff',
        'area': '#f1f1f1',
        'zone': '#e5e7eb',
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
      pattern: /bg-blue-(400|500)/
    }
  ],
  plugins: [],
};

module.exports = config;
