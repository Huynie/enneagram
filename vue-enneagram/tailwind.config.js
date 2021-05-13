module.exports = {
    purge: [],
     darkMode: false, // or 'media' or 'class'
     theme: {
         maxWidth:{
             '20': '20%',
             '40': '40%',
             '50': '50%',
             '60': '60%',
             '80': '80%',
             '800': '800px'
         }
     },
     variants: {
      extend: {
        backgroundColor: ['focus'],
        opacity: ['disabled'],
      }
     },
     plugins: [
         require('tailwindcss'),
         require('autoprefixer'),
     ],
   }