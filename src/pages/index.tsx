import { HomeRounded } from '@mui/icons-material'
import { Container, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = (): JSX.Element => {
  return <>
    <Head>
      <title>Create Next App</title>
    </Head>

    <Container maxWidth="lg" sx={{ my: 12, textAlign: 'center' }}>
      <Typography component="h1" variant="h1" sx={{ mb: 6 }}>
          Welcome to <Link href="https://nextjs.org">Next.js!</Link>
      </Typography>

      <HomeRounded fontSize="inherit" sx={{ fontSize: '14rem' }} />
    </Container>
  </>
}

export default Home
