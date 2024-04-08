import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/utils'
import CssBaseline from '@mui/material/CssBaseline'
import type { Theme } from '@mui/material/styles'
import { createTheme, styled } from '@mui/material/styles'
import ThemeProvider from '@mui/system/ThemeProvider'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import Loader from 'components/shared/Loader'
import AuthWrapper from 'components/shared/auth/Wrapper'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import type { FunctionComponent, PropsWithChildren } from 'react'
import { useState } from 'react'
import 'styles/globals.css'
import lightThemeOptions from 'styles/lightThemeOptions'
import createEmotionCache from 'utility/createEmotionCache'

interface MyAppProps extends AppProps {
  Component: AppProps['Component'] & { auth?: boolean }
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
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: {
      initialSession,
      ...pageProps
    }
  } = props

  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return <CacheProvider value={emotionCache}>
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline enableColorScheme />

      <Main>
        {supabaseClient === null ? <Loader /> : <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={initialSession}
        >
          {Component.auth ? <AuthWrapper>
            <Component {...pageProps} />
          </AuthWrapper> : (
            <Component {...pageProps} />
          )}
        </SessionContextProvider>}
      </Main>
    </ThemeProvider>
  </CacheProvider>
}

export default MyApp
