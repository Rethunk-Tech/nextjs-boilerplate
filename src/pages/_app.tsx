import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/utils'
import CssBaseline from '@mui/material/CssBaseline'
import type { Theme } from '@mui/material/styles'
import { createTheme, styled } from '@mui/material/styles'
import ThemeProvider from '@mui/system/ThemeProvider'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import type { FunctionComponent, PropsWithChildren } from 'react'
import 'styles/globals.css'
import lightThemeOptions from 'styles/lightThemeOptions'
import createEmotionCache from 'utility/createEmotionCache'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const clientSideEmotionCache: EmotionCache = createEmotionCache()

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

const MyApp: FunctionComponent<MyAppProps> = (props: PropsWithChildren<MyAppProps>) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />

        <Main>
          <Component {...pageProps} />
        </Main>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
