import type { EmotionCache } from '@emotion/cache'
import type { EmotionCriticalToChunks } from '@emotion/server/create-instance'
import createEmotionServer from '@emotion/server/create-instance'
import type {
  AppPropsType,
  DocumentInitialProps,
  RenderPage
} from 'next/dist/shared/lib/utils'
import type { DocumentContext } from 'next/document'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import type { NextRouter } from 'next/router'
import { Children } from 'react'
import theme from 'styles/lightThemeOptions'
import createEmotionCache from 'utility/createEmotionCache'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="theme-color"
            content={theme.palette.primary.main}
          />
          <meta
            name="msapplication-TileColor"
            content={theme.palette.primary.main}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage: RenderPage = ctx.renderPage

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache: EmotionCache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  /* eslint-disable */
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props: AppPropsType<NextRouter, {}>) =>
        <App emotionCache={cache} {...props} />,
    })
  /* eslint-enable */

  const initialProps: DocumentInitialProps = await Document.getInitialProps(ctx)
  const emotionStyles: EmotionCriticalToChunks = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags: JSX.Element[] = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    styles: [
      ...Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  }
}