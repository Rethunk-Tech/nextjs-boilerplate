import Box from '@mui/material/Box'
import Link from 'components/mui/Link'

const styles = {
  footer: {
    bottom:    0,
    left:      0,
    m:         4,
    position:  'fixed',
    right:     0,
    textAlign: 'center',
  },
}

export default function Footer(): JSX.Element {
  return <Box sx={styles.footer}>
    Made with ❤️ by <Link
      href="https://we.rethunk.tech/"
      rel="noopener noreferrer"
      target="_blank"
    >
      Rethunk.Tech
    </Link>
  </Box>
}
