import LockIcon from '@mui/icons-material/Lock'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { PropsWithChildren } from 'react'

export default function AuthRequired(props: PropsWithChildren): JSX.Element {
  const { children } = props

  return <Box
    sx={{
      display:   'grid',
      minHeight: 'calc(100vh - 56px)',
      textAlign: 'center'
    }}
  >
    <LockIcon
      sx={{
        fontSize: '10em',
        m:        'auto',
        mb:       2,
      }}
    />
    
    {children || <Typography variant="h4">
      Please login to view this page.
    </Typography>}
  </Box>
}
