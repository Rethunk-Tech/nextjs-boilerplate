import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const lightThemeOptions = createTheme({
  palette: {
    mode: 'light',
  },
})

export default responsiveFontSizes(lightThemeOptions)
