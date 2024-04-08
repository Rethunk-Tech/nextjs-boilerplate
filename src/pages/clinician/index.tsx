import DoctorIcon from '@mui/icons-material/SupervisorAccount'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import AppBar from 'components/shared/AppBar'
import PatientSelector from 'components/shared/PatientSelector'
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
    <Box
      sx={{
        display:             'grid',
        gridTemplateColumns: '1fr 2fr',

        height:    '100%',
        minHeight: 'calc(100svh)',

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
          Select Patient
        </Typography>

        <Typography variant="body1">
          Choose a patient to view their range of motion data or modify their exercises.
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
        <PatientSelector
          noun="Patient"
          role="clinician"
        />
      </Box>
    </Box>
  </>
}
