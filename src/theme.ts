import { extendTheme } from '@mui/material/styles'

const theme = extendTheme({
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
          msOverflowStyle: 'none', // IE 10+
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'white' // override luôn biến var(...)
          }
        }
      }
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
    // fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif'
  }
})

export default theme