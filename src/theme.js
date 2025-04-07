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
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
    // fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif'
  }
})

export default theme