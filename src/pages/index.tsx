import HomeRounded from '@mui/icons-material/HomeRounded'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Footer from 'components/example/Footer'
import Link from 'components/mui/Link'
import type { NextPage } from 'next'
import Head from 'next/head'

const styles = {
  container: {
    display:    'grid',
    height:     '100vh',
    placeItems: 'center',
    textAlign:  'center',
  },

  typography: {
    my: 4,

    // no marinBottom on last of type
    '&:last-of-type': {
      mb: 0,
    },

    // link
    '& a': {
      textDecoration: 'none',
    },

    // code
    '& code': {
      border:       '1px solid',
      borderColor:  'secondary.light',
      borderRadius: 1,
      color:        'secondary.main',
      display:      'inline-block',
      px:           1,
      py:           0.5,
    },
  },
}


const Home: NextPage = (): JSX.Element => {
  return <>
    <Head>
      <title>Boilerplate by Rethunk.Tech</title>
    </Head>

    {/* full-height container with centered content */}
    <Box sx={styles.container}>
      {/* inner container holds centered content together */}
      <Box>
        <HomeRounded sx={{ fontSize: '14rem' }} />

        <Typography component="h1" sx={styles.typography} variant="h2">
          <Link
            href="https://nextjs.org"
            rel="noopener noreferrer"
            target="_blank"
          >
            Next.js
          </Link> + <Link
            href="https://mui.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            MUI
          </Link> + <Link
            href="https://typescriptlang.org"
            rel="noopener noreferrer"
            target="_blank"
          >
            TypeScript
          </Link>!
        </Typography>

        <Typography component="p" sx={styles.typography} variant="h4">
          Get started by editing <code>pages/index.tsx</code>
        </Typography>
      </Box>
    </Box>

    <Footer />
  </>
}

export default Home
