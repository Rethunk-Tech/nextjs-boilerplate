import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MessageIcon from '@mui/icons-material/Message'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import LabeledIconButton from 'components/mui/LabeledIconButton'
import AppBar from 'components/shared/AppBar'
import PatientForm from 'components/shared/PatientForm'
import ProgramList from 'components/shared/ProgramList'
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
        gridTemplateRows: 'auto 1fr auto',
        gap:              2,
        m:                3,

        height: 'calc(100svh - 64px)',
      }}
    >
      <Box sx={{ flex: 0, flexShrink: 1 }}>
        <PatientForm noun="patient" patientID={patientID} wide />
      </Box>

      <ProgramList role="clinician" patientID={patientID} />

      <Box
        sx={{
          display:        'grid',
          flex:           0,
          flexShrink:     1,
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
