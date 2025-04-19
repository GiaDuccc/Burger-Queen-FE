import { extendTheme } from '@mui/material/styles'

const HEADER_HEIGHT = '46px'

const theme = extendTheme ({
  shop: {
    headerHeight: HEADER_HEIGHT
  },
  colorSchemes: {
    light: {},
    dark: {}
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          // '&.MuiTypography-body1': { fontSize: '0.875rem' }
          fontSize: '0.875rem'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none' // IE 10+
        },
        // '&::-webkit-scrollbar': {
        //   display: 'none' // Chrome, Safari
        // }
      }
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
    // fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif'
  }
})

export default theme