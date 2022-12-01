// const tailwindcss = require("tailwindcss");
// const autoprefixer = require("autoprefixer");

import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

import tailwindConfig from './tailwind.config.js'

export default {
  plugins: [
    //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    tailwindcss(tailwindConfig),
    //But others, like autoprefixer, need to run after,
    autoprefixer,
  ],
};
