import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from 'components/mui/Link'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ClinicianLogin: NextPage = (): JSX.Element => {
  const [stage, setState] = useState(0)
  const [clinicianID, setClinicianID] = useState('')
  const [clinicianPIN, setClinicianPIN] = useState('')

  const router = useRouter()
  useEffect(() => {
    if (stage === 2) {
      router.push('/patient-login')
    }
  }, [router, stage])

  return <>
    <Head>
      <title>Range of Motion</title>
    </Head>

    <Box
      sx={{
        m:         'auto',
        textAlign: 'center',
        width:     '100%',
      }}
    >
      <Typography sx={{ mb: 1 }} variant="h2">
        Clinician Sign In
      </Typography>
      <Typography sx={{ mb: 1 }} variant="h5">
        BAMC - Device 2
      </Typography>
      <Link href="">
        Return to Login Screen
      </Link>

      <Box
        sx={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-around',
          mt:             4,

          '& > *': {
            textAlign: 'center',
          },
        }}
      >
        <Box>
          <Box
            sx={{
              backgroundColor: 'secondary.light',
              borderRadius:    2,
              color:           'white',
              textAlign:       'center',
              mx:              'auto',
              mt:              4,
              mb:              2,
              height:          128,
              width:           128,
            }}
          >
            QR Code
          </Box>

          <Typography variant="subtitle2">
            Scan with your mobile device to sign in.
          </Typography>
        </Box>

        <Divider orientation="vertical">
          or
        </Divider>

        {stage === 0 ? (
          <Box>
            <TextField
              fullWidth
              label="Clinician ID"
              margin="normal"
              onChange={(e) => setClinicianID(e.target.value)}
              sx={{ mb: 5 }}
              value={clinicianID}
              variant="outlined"
            />
            <Button
              color="primary"
              disabled={!clinicianID}
              fullWidth
              onClick={() => setState(1)}
              size="large"
              sx={{ mb: 2 }}
              variant="contained"
            >
              Continue
            </Button>

            <Box
              sx={{
                display:        'flex',
                alignItems:     'center',
                flexDirection:  'row',
                justifyContent: 'space-between',
                width:          '100%',
              }}
            >
              <Link href="">
                Forgot your Clinician ID?
              </Link>
              <Link href="">
                Sign Up
              </Link>
            </Box>
          </Box>
        ) : null}

        {stage === 1 ? (
          <Box>
            <Typography
              sx={{ mb: 2 }}
              variant="h6"
            >
              Logging In as <code>{clinicianID}</code>
            </Typography>

            <TextField
              fullWidth
              inputProps={{
                type: 'password',
              }}
              label="Clinician PIN / Password"
              margin="normal"
              onChange={(e) => setClinicianPIN(e.target.value)}
              sx={{ mb: 4 }}
              variant="outlined"
            />
            <Button
              color="primary"
              disabled={!clinicianPIN}
              fullWidth
              onClick={() => setState(2)}
              size="large"
              sx={{ mb: 2 }}
              variant="contained"
            >
              Log In
            </Button>

            <Box
              sx={{
                display:        'flex',
                alignItems:     'center',
                flexDirection:  'row',
                justifyContent: 'space-between',
                width:          '100%',
              }}
            >
              <Link href="">
                Forgot your Clinician PIN?
              </Link>
              <Link href="" onClick={() => setState(0)}>
                Cancel
              </Link>
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  </>
}

export default ClinicianLogin
