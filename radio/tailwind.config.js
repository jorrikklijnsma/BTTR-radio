const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      gray: colors.trueGray,
      purple: colors.purple,
      violet: colors.violet,
      fuchsia: colors.fuchsia,
      amber: colors.amber,
      lime: colors.lime,
      rose: colors.rose,
      white: '#fff',
    },
    extend: {
      boxShadow: {
        'border-bottom': '0 2px 0 0 rgba(255,255,255,.4)',
      }
    },
  },
  variants: {
    extend: {
     translate: ['group-hover', 'group-focus'],
     scale: ['group-hover', 'group-focus'],
     boxShadow: ['focus'],
     ringWidth: ['hover'],
     padding: ['hover'],
    }
  },
  plugins: [],
}
