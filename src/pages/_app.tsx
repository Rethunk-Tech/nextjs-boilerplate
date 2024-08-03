import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import CssBaseline from '@mui/material/CssBaseline'
import type { Theme } from '@mui/material/styles'
import { createTheme, styled } from '@mui/material/styles'
import ThemeProvider from '@mui/system/ThemeProvider'
import { AppProps } from 'next/app'
import Head from 'next/head'
import 'styles/globals.css'

import lightThemeOptions from 'styles/lightThemeOptions'
const lightTheme: Theme = createTheme(lightThemeOptions)

const Main = styled('main', {
  shouldForwardProp: (prop: PropertyKey) => prop !== 'open'
})(({ theme }) => ({
  display:       'flex',
  flexDirection: 'column',
  flexGrow:      1,
  minHeight:     '100vh',
  transition:    theme.transitions.create(['margin', 'width'], {
    easing:   theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
}))

export default function MyApp(props: AppProps): JSX.Element {
  const { Component, pageProps } = props

  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />

        <Main>
          <Component {...pageProps} />
        </Main>
      </ThemeProvider>
    </AppCacheProvider>
  )
}
