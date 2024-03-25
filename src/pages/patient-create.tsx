import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from 'components/mui/Link'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const PatientLogin: NextPage = (): JSX.Element => {
  const [stage, setState] = useState(0)

  const router = useRouter()
  const [clinicianID, setClinicianID] = useState('')
  useEffect(() => {
    const clinicianID = router.query.clinicianID
    if (clinicianID) {
      setClinicianID(clinicianID as string)
    }
  }, [router.query.clinicianID])

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
        {clinicianID === '' ? 'Patient Sign Up' : 'Patient Creation'}
      </Typography>
      <Typography sx={{ mb: 1 }} variant="h5">
        BAMC - Device 2
      </Typography>
      {clinicianID === '' ? <Link href="">
        Return to Login Screen
      </Link> : <Typography sx={{ mt: 2 }} variant="h6">
        Clinician: {clinicianID}
      </Typography>}

      <Box
        sx={{
          maxWidth: '50%',
          mx:       'auto',
        }}
      >
        <Box
          sx={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 2,
            mb:                  2,
            mt:                  3,
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
          <TextField
            fullWidth
            label="Date of Birth"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Height"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Weight"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Sex"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Affected Limb"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Diagnosis"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Injury Date"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Surgery Date"
            variant="outlined"
          />
        </Box>

        <Button
          color="primary"
          fullWidth
          onClick={() => router.push('/dashboard')}
          size="large"
          sx={{ mt: 2, mb: 1 }}
          variant="contained"
        >
          Create Patient
        </Button>
        <Link href="">
          Return to Patient Selection
        </Link>
      </Box>
    </Box>
  </>
}

export default PatientLogin
