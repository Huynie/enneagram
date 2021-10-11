module.exports = {
    purge: [
        './src/**/*.html',
        './src/**/*.vue',
        './src/**/*.js',
      ],
     darkMode: false, // or 'media' or 'class'
     theme: {
         maxWidth:{
             '20': '20%',
             '40': '40%',
             '50': '50%',
             '60': '60%',
             '75': '75%',
             '80': '80%',
             '800': '800px'
         }
     },
     variants: {
      extend: {
        backgroundColor: ['active', 'focus', 'focus-visible'],
        ringWidth: ['focus-visible', 'focus'],
        ringColor: ['focus-visible', 'focus'],
        ringOffsetWidth: ['focus-visible', 'focus'],
        ringOffsetColor: ['focus-visible', 'focus'],
        opacity: ['disabled'],
      }
     },
     plugins: [
         require('tailwindcss'),
         require('autoprefixer'),
     ],
   }