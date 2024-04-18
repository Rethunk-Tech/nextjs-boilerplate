import Toolbar from '@mui/material/Toolbar'
import AppBar from 'components/shared/AppBar'
import ProgramView from 'components/shared/ProgramView'
import Head from 'next/head'
import { useRouter } from 'next/router'

/**
 * Clinician Patient's Program Page
 * 
 * @description ...
 * 
 * @returns {JSX.Element} JSX.Element - NextJS format page
 */
export default function ClinicianPatientProgramPage(): JSX.Element {
  const router = useRouter()

  const patientID = router.query.patientID as string
  const programID = router.query.programID as string

  return <>
    <Head>
      <title>Range of Motion</title>
    </Head>

    <AppBar role="clinician" patientID={patientID} />
    <Toolbar />

    <ProgramView
      role="clinician"
      patientID={patientID}
      programID={programID}
    />
  </>
}
