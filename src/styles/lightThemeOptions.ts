import type { Theme } from '@mui/material/styles'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const lightThemeOptions: Theme = createTheme({
  palette: {
    mode: 'light',
  },
})

export default responsiveFontSizes(lightThemeOptions)
