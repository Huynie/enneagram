module.exports = {
    purge: [
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.js',
    ],
     darkMode: false, // or 'media' or 'class'
     theme: {
       extend: {},
     },
     variants: {
      extend: {
        backgroundColor: ['active'],
      }
     },
     plugins: [
         require('tailwindcss'),
         require('autoprefixer'),
     ],
   }