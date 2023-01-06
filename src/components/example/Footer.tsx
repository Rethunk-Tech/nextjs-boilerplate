import Box from '@mui/material/Box'
import Link from 'components/mui/Link'
import type { FC } from 'react'

const styles = {
  footer: {
    bottom:    0,
    left:      0,
    right:     0,
    m:         4,
    position:  'fixed',
    textAlign: 'center',
  },
}

const Footer: FC = (): JSX.Element => {
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

export default Footer