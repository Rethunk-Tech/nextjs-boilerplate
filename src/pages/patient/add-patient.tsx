import DoctorIcon from '@mui/icons-material/SupervisorAccount'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import AppBar from 'components/shared/AppBar'
import PatientCreateForm from 'components/shared/PatientCreateForm'
import Head from 'next/head'

/**
 * Clinician Select Patient Page
 * 
 * @description ...
 * 
 * @returns {JSX.Element} JSX.Element - NextJS format page
 */
export default function ClinicianSelectPatient(): JSX.Element {
  return <>
    <Head>
      <title>Range of Motion</title>
    </Head>

    <AppBar role="patient" />
    <Toolbar />

    <Box
      sx={{
        display:             'grid',
        gridTemplateColumns: '1fr 2fr',

        height:    '100%',
        minHeight: 'calc(100svh - 64px)',

        '& > *': {
          display:        'flex',
          alignItems:     'center',
          flexDirection:  'column',
          justifyContent: 'center',
        }
      }}
    >
      <Paper
        elevation={12}
        sx={{
          borderRadius: 0,
          px:           6,
          textAlign:    'left',
        }}
      >
        <DoctorIcon sx={{ fontSize: '12em' }} />

        <Typography gutterBottom variant="h2">
          New Profile
        </Typography>

        <Typography variant="body1">
          Enter your information to begin tracking your range of motion. All fields can be updated later.
        </Typography>
      </Paper>

      <Box
        sx={{
          alignItems: 'stretch',
          gap:        2,
          maxWidth:   600,
          mx:         'auto',
          width:      '30vw',
        }}
      >
        <PatientCreateForm noun='profile' />
      </Box>
    </Box>
  </>
}
