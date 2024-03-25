import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from 'components/mui/Link'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const PatientLogin: NextPage = (): JSX.Element => {
  const [patientID, setPatientID] = useState('')
  const [patientPIN, setPatientPIN] = useState('')
  const [stage, setState] = useState(0)

  const router = useRouter()
  useEffect(() => {
    if (stage === 2) {
      // ...
    }
  }, [router, stage])

  const [clinicianID, setClinicianID] = useState('')
  useEffect(() => {
    const clinicianID = router.query.clinicianID
    if (clinicianID) {
      setClinicianID(clinicianID as string)
    }
  }, [router.query.clinicianID])

  const [patients, setPatients] = useState([
    {
      id:       '1234',
      name:     'John Doe',
      lastSeen: '2021-10-01T12:00:00Z',
    },
    {
      id:       '5671',
      name:     'Jane Smith',
      lastSeen: '2021-10-01T12:00:00Z',
    },
    {
      id:       '1247',
      name:     'John Doe',
      lastSeen: '2024-03-01T12:00:00Z',
    },
    {
      id:       '5679',
      name:     'Jane Smith',
      lastSeen: '2023-10-01T12:00:00Z',
    },
    {
      id:       '5680',
      name:     'Jane Smith',
      lastSeen: '2024-03-01T12:00:00Z',
    }
  ])
  const [search, setSearch] = useState('')
  const [showingAll, setShowingAll] = useState(false)

  const [testingMode, setTestingMode] = useState(0)

  return <>
    <Head>
      <title>Range of Motion</title>
    </Head>

    <Button
      onClick={() => setTestingMode(testingMode === 0 ? 1 : 0)}
      sx={{
        position: 'absolute',
        right:    16,
        top:      16,
      }}
    >
      Change Mode
    </Button>

    <Box
      sx={{
        m:         'auto',
        textAlign: 'center',
        width:     '100%',
      }}
    >
      <Typography sx={{ mb: 1 }} variant="h2">
        {clinicianID === '' ? 'Patient Sign In' : 'Patient Selection'}
      </Typography>
      <Typography sx={{ mb: 1 }} variant="h5">
        BAMC - Device 2
      </Typography>
      {clinicianID === '' ? <Link href="/login">
        Return to Login Screen
      </Link> : <Typography sx={{ mt: 2 }} variant="h6">
        Clinician: {clinicianID}
      </Typography>}

      {clinicianID === '' ? <Box
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
              label="Patient ID"
              margin="normal"
              onChange={(e) => setPatientID(e.target.value)}
              sx={{ mb: 5 }}
              value={patientID}
              variant="outlined"
            />
            <Button
              color="primary"
              disabled={!patientID}
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
                Forgot your Patient ID?
              </Link>
              <Link href="/patient-signup">
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
              Logging In as <code>{patientID}</code>
            </Typography>

            <TextField
              fullWidth
              inputProps={{
                type: 'password',
              }}
              label="Patient PIN / Password"
              margin="normal"
              onChange={(e) => setPatientPIN(e.target.value)}
              sx={{ mb: 4 }}
              variant="outlined"
            />
            <Button
              color="primary"
              disabled={!patientPIN}
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
                Forgot your Patient PIN?
              </Link>
              <Link href="" onClick={() => setState(0)}>
                Cancel
              </Link>
            </Box>
          </Box>
        ) : null}
      </Box> : 
        <Box
          sx={{
            maxWidth: '50%',
            mt:       2,
            mx:       'auto',
          }}
        >
          <Box
            sx={{
              display:        'flex',
              alignItems:     'center',
              flexDirection:  'row',
              gap:            1,
              justifyContent: 'space-between',
              width:          '100%',
            }}
          >
            <Button
              color="primary"
              fullWidth
              onClick={() => router.push('/patient-create')}
              size="large"
              sx={{ mt: 2 }}
              variant="contained"
            >
              New Patient
            </Button>
            <Button
              color="primary"
              fullWidth
              onClick={() => router.push('/patient-create')}
              size="large"
              sx={{ mt: 2 }}
              variant="contained"
            >
              One-Time Patient
            </Button>
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Search"
              margin="normal"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              variant="outlined"
            />

            {testingMode === 0 ? <List disablePadding>
              {patients
                .sort((a, b) => a.lastSeen > b.lastSeen ? -1 : 1)
                .filter(x => x.name.toLowerCase().includes(search.toLowerCase()) || x.id.includes(search))
                .filter((_, i) => showingAll || i < 3)
                .map(x => <ListItemButton key={x.id}>
                  <ListItemIcon>
                    <Avatar />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${x.name} (${x.id})`}
                    secondary={x.lastSeen}
                  />
                </ListItemButton>)}
            </List> : <Box
              sx={{
                display:        'flex',
                alignItems:     'center',
                flexDirection:  'row',
                gap:            2,
                justifyContent: 'space-between',
                mt:             2,

                '.MuiListItemButton-root': {
                  display:    'grid',
                  placeItems: 'center',
                  textAlign:  'center',
                }
              }}
            >
              {patients.map(x => <ListItemButton key={x.id}>
                <Avatar
                  sx={{
                    height: 64,
                    width:  64,
                    mb:     1,
                  }}
                />
                <Typography variant="h6">
                  {x.name}
                </Typography>
                <Typography variant="subtitle2">
                  {x.id}
                </Typography>
              </ListItemButton>)}
            </Box>}

            {(!showingAll && !search) && <Button
              color="primary"
              fullWidth
              onClick={() => setShowingAll(true)}
              size="large"
              sx={{ mt: 1 }}
              variant="outlined"
            >
              Show Older Patients
            </Button>}
          </Box>
        </Box>
      }
    </Box>
  </>
}

export default PatientLogin
