import DoctorIcon from '@mui/icons-material/SupervisorAccount'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import AppBar from 'components/shared/AppBar'
import PatientForm from 'components/shared/PatientForm'
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

    <AppBar role="clinician" />
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
          New Patient
        </Typography>

        <Typography variant="body1">
          Enter the patient&apos;s information to begin tracking their range of motion. All fields can be updated later.
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
        <PatientForm noun='patient' />
      </Box>
    </Box>
  </>
}
