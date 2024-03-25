import PatientIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import DoctorIcon from '@mui/icons-material/SupervisorAccount'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Login: NextPage = (): JSX.Element => {
  const router = useRouter()

  return <>
    <Head>
      <title>Range of Motion</title>
    </Head>

    <Box
      sx={{
        m:     'auto',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display:        'flex',
          alignItems:     'stretch',
          flexDirection:  'row',
          gap:            '15%',
          justifyContent: 'center',
          textAlign:      'center',
        }}
      >
        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom variant="h2">
            Welcome
          </Typography>
          <Typography sx={{ mb: 4 }} variant="h5">
            BAMC - Device 2
          </Typography>

          <IconButton
            sx={{
              fontSize: '8rem',
            }}
          >
            <SettingsIcon fontSize="inherit" />
          </IconButton>

          <Typography variant="h5">
            Device Settings
          </Typography>
        </Box>

        <Box
          sx={{
            display:        'flex',
            alignItems:     'flex-start',
            justifyContent: 'stretch',
            gap:            8,
          }}
        >
          <Box sx={{ textAlign: 'left', mt: 2 }}>
            <Typography gutterBottom variant="h2">
              Sign In
            </Typography>
            <Typography variant="h5">
              New and Existing Users
            </Typography>
          </Box>

          <Box>
            <Box onClick={() => router.push('/clinician-login')}>
              <IconButton
                sx={{
                  fontSize: '8rem',
                }}
              >
                <DoctorIcon fontSize="inherit" />
              </IconButton>
              <Typography variant="h5">
                Clinician
              </Typography>
            </Box>

            <Box onClick={() => router.push('/patient-login')} sx={{ mt: 8 }}>
              <IconButton
                sx={{
                  fontSize: '8rem',
                }}
              >
                <PatientIcon fontSize="inherit" />
              </IconButton>
              <Typography variant="h5">
                Patient
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  </>
}

export default Login
