const theme = require('@bambee/pollen/src/tailwind/theme');
const typographyPlugin = require('@bambee/pollen/src/tailwind/plugins/typography');

const { inset, spacing, transitionDuration, ...rest } = theme.default;

module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    ...rest,
    extend: {
      inset,
      spacing,
      transitionDuration,
    },
  },
  variants: {},
  plugins: [typographyPlugin],
};
