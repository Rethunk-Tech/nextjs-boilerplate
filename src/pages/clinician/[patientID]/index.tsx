import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MessageIcon from '@mui/icons-material/Message'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import LabeledIconButton from 'components/mui/LabeledIconButton'
import AppBar from 'components/shared/AppBar'
import ExerciseList from 'components/shared/ExerciseList'
import PatientUpdateForm from 'components/shared/PatientUpdateForm'
import Head from 'next/head'
import { useRouter } from 'next/router'

/**
 * Clinician Page
 * 
 * @description ...
 * 
 * @returns {JSX.Element} JSX.Element - NextJS format page
 */
export default function ClinicianPage(): JSX.Element {
  const router = useRouter()

  const patientID = router.query.patientID as string

  return <>
    <Head>
      <title>Range of Motion</title>
    </Head>

    <AppBar role="clinician" patientID={patientID} />
    <Toolbar />

    <Box
      sx={{
        display:          'grid',
        gridTemplateRows: '1fr auto auto',
        gap:              2,
        p:                3,

        height: 'calc(100svh - 64px)',
      }}
    >
      <PatientUpdateForm noun="patient" patientID={patientID} />

      <ExerciseList role="clinician" patientID={patientID} />

      <Box
        sx={{
          display:        'grid',
          gap:            2,
          gridAutoFlow:   'column',
          justifyContent: 'stretch',
        }}
      >
        <LabeledIconButton
          icon={<MessageIcon />}
          label="Message Patient"
          layout="horizontal"
          size="medium"
        />
        <LabeledIconButton
          icon={<AccountCircleIcon />}
          label="My Account"
          layout="horizontal"
          size="medium"
        />
      </Box>
    </Box>
  </>
}
