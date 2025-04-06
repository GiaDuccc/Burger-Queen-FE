import { extendTheme } from '@mui/material/styles'

const HEADER_HEIGHT = '44px'

const theme = extendTheme ({
  shop: {
    headerHeight: HEADER_HEIGHT
  },
  colorSchemes: {
    light: {},
    dark: {}
  },
  components: {}
})

export default theme