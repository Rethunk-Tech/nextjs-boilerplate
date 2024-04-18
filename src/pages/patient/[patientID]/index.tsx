import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MessageIcon from '@mui/icons-material/Message'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import LabeledIconButton from 'components/mui/LabeledIconButton'
import AppBar from 'components/shared/AppBar'
import ProgramList from 'components/shared/ProgramList'
import Head from 'next/head'
import { useRouter } from 'next/router'

/**
 * Patient Page
 * 
 * @description ...
 * 
 * @returns {JSX.Element} JSX.Element - NextJS format page
 */
export default function PatientPage(): JSX.Element {
  const router = useRouter()

  const patientID = router.query.patientID as string

  return <>
    <Head>
      <title>Range of Motion</title>
    </Head>

    <AppBar role="patient" patientID={patientID} />
    <Toolbar />

    <Box
      sx={{
        display:          'grid',
        gridTemplateRows: '1fr auto',
        gap:              2,
        p:                3,

        height: 'calc(100svh - 64px)',
      }}
    >
      {/* <PatientForm noun="profile" patientID={patientID} wide /> */}

      <ProgramList role="patient" patientID={patientID} />

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
          label="Message Clinician"
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
