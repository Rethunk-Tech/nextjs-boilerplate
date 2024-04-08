import PatientIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import DoctorIcon from '@mui/icons-material/SupervisorAccount'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LabeledIconButton from 'components/mui/LabeledIconButton'
import Head from 'next/head'
import { useRouter } from 'next/router'

/**
 * Signin Page
 * 
 * @description Allows the user to select between clinician and patient signin,
 * or to access device settings.
 * 
 * @returns {JSX.Element} JSX.Element - NextJS format page
 */
export default function Signin(): JSX.Element {
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
        <Box sx={{ mt: 5 }}>
          <Typography sx={{ mb: 14.75 }} variant="h2">
            Welcome!
          </Typography>

          <LabeledIconButton
            icon={<SettingsIcon />}
            label="Settings"
            onClick={() => router.push('/settings')}
          />
        </Box>

        <Box
          sx={{
            display:        'flex',
            alignItems:     'flex-start',
            justifyContent: 'stretch',
            gap:            12,
          }}
        >
          <Box sx={{ textAlign: 'left', mt: 5 }}>
            <Typography gutterBottom variant="h2">
              Sign In
            </Typography>
            <Typography variant="h5">
              New and Existing Users
            </Typography>
          </Box>

          <Box
            sx={{
              display:       'flex',
              alignItems:    'stretch',
              flexDirection: 'column',
              gap:           2,
            }}
          >
            <LabeledIconButton
              icon={<DoctorIcon />}
              label="Clinician"
              onClick={() => router.push('/auth/signin/clinician')}
            />
            <LabeledIconButton
              icon={<PatientIcon />}
              label="Patient"
              onClick={() => router.push('/auth/signin/patient')}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  </>
}
