module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,vue,yml}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#ff374a',
        secondary: '#5865f2',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}