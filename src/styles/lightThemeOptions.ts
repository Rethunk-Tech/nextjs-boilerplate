import type { Theme } from '@mui/material/styles'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const lightThemeOptions: Theme = createTheme({
  palette: {
    mode:    'dark',
    primary: {
      main: '#0a84ff',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  shape: {
    borderRadius: 16, // default: 4
  },
  typography: {
    htmlFontSize: 12, // default: 16 -- smaller value results in larger text
    h1:           {
      fontSize:   '5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize:   '2.75rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2.5rem',
    },
    h4: {
      fontSize: '2rem',
    },
    subtitle1: {
      fontSize: '1.75rem',
    },
    subtitle2: {
      fontSize: '1.625rem',
    },
    h5: {
      fontSize: '1.5rem',
    },
    h6: {
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
    },
  }
})

export default responsiveFontSizes(lightThemeOptions)
