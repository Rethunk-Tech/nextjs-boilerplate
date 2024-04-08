import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import branding from 'branding'
import { useRouter } from 'next/router'

/**
 * Out of Box Experience page
 * 
 * @description Allows new users to decide between starting the device setup
 * or restoring a previous device backup.
 * 
 * @returns {JSX.Element} JSX.Element - NextJS format page
 */
export default function Index(): JSX.Element {
  const router = useRouter()

  return <Box
    sx={{
      height: '100svh',

      '&, & > *': {
        display:    'grid',
        placeItems: 'center',
        textAlign:  'center',
      },
    }}
  >
    <Box>
      <Typography
        sx={{ mb: 4 }}
        variant="h1"
      >
        {branding.company}
      </Typography>

      <Button
        size="large"
        sx={{ mb: 2 }}
        variant="contained"
      >
        Start Device Setup
      </Button>

      <Button
        color="secondary"
        onClick={() => router.push('/auth/signin')}
        variant="text"
      >
        Restore
      </Button>
    </Box>
  </Box>
}
