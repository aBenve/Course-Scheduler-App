function generateNumberPairs(from, to) {
  return Object.fromEntries(Array(to - from).fill().map((_, i) => i + from).map(n => [String(n), String(n)]))
}

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontSize:{
        'xxs': ['0.5rem', {lineHeight: '0.5rem'}],
      },
      gridRowStart: {
        ...generateNumberPairs(7, 40)
      },
      gridRowEnd: {
        ...generateNumberPairs(7, 40)
      }
    },
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
