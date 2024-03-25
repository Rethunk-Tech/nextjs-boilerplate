import { Button, FormHelperText } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from 'components/mui/Link'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

const PatientSignup: NextPage = (): JSX.Element => {
  const [stage, setState] = useState(0)

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
        Patient Sign Up
      </Typography>
      <Typography sx={{ mb: 1 }} variant="h5">
        BAMC - Device 2
      </Typography>
      <Link href="/patient-login">
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
        {stage === 0 ? (
          <Box>
            <Box
              sx={{
                display:             'grid',
                gridTemplateColumns: '1fr 1fr',
                gap:                 2,
                placeItems:          'center',
              }}
            >
              <TextField
                fullWidth
                label="First Name"
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Last Name"
                required
                variant="outlined"
              />
              <FormControl
                fullWidth
                required
                variant="outlined"
              >
                <InputLabel>Clinic</InputLabel>
                <Select label="Clinic">
                  <MenuItem value="BAMC">BAMC</MenuItem>
                </Select>
                <FormHelperText>
                The clinic you are associated with
                </FormHelperText>
              </FormControl>
              <TextField
                fullWidth
                helperText="You will use this to login later"
                label="Email Address"
                required
                variant="outlined"
              />
            </Box>

            <Button
              color="primary"
              fullWidth
              onClick={() => setState(1)}
              size="large"
              sx={{ mt: 4 }}
              variant="contained"
            >
              Sign Up
            </Button>
          </Box>
        ) : null}
        
        {stage === 1 ? (
          <Box>
            <Typography sx={{ mb: 2 }} variant="h3">
              Sign Up Complete
            </Typography>
            <Typography variant="subtitle2">
              Please check your email for a link to sign in.
            </Typography>
          </Box>
        ) : null}
      </Box>
    </Box>
  </>
}

export default PatientSignup
