module.exports = {
    purge: [
        './src/**/*.html',
        './src/**/*.vue',
        './src/**/*.js',
      ],
     darkMode: false, // or 'media' or 'class'
     theme: {
       backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#89E5CF',
        'secondary': '#EEFBF8',
        'questions': '#5CDCBD',
        'pressed': '#67D2D2'
       }),
      //  borderRadius: {
      //   'divider': '10rem'
      //  },
        maxWidth:{
            '20': '20%',
            '40': '40%',
            '50': '50%',
            '60': '60%',
            '75': '75%',
            '80': '80%',
            '800': '800px',
            '500': '500px'
        },
        minHeight: {
          '1/2' : '50%'
        },
        extend: {
          dropShadow: {
            'nav': '0 2px 2px rgba(0, 0, 0, 0.25)'
          }
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
        dropShadow: ['hover']
      }
     },
     plugins: [
         require('tailwindcss'),
         require('autoprefixer'),
     ],
    //  corePlugins: {
    //    minHeight: true,
    //  }
   }