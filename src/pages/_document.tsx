import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from '@mui/material-nextjs/v14-pagesRouter'
import type { DocumentContext, DocumentProps } from 'next/document'
import { Head, Html, Main, NextScript } from 'next/document'
import theme from 'styles/lightThemeOptions'

export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps): JSX.Element {
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
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext): Promise<unknown> => {
  const finalProps = await documentGetInitialProps(ctx)
  return finalProps
}
