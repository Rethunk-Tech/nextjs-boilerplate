import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Toolbar from '@mui/material/Toolbar'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import AppBar from 'components/shared/AppBar'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { PROGRAMS_TABLE } from 'types/Program'

/**
 * Patient Program Latest Page
 * 
 * @description ...
 * 
 * @returns {JSX.Element} JSX.Element - NextJS format page
 */
export default function PatientProgramLatestPage(): JSX.Element {
  const router = useRouter()
  const patientID = router.query.patientID as string
  
  const supabase = useSupabaseClient()
  useEffect(() => {
    if (!patientID) return

    supabase
      .from(PROGRAMS_TABLE)
      .select('id')
      .eq('patient_id', patientID)
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
          return
        }

        if (data?.length) router.push(`/patient/${patientID}/program/${data[0].id}`)
      })
  }, [patientID, router, supabase])

  return <>
    <Head>
      <title>Range of Motion</title>
    </Head>

    <AppBar role="patient" patientID={patientID} />
    <Toolbar />

    <Backdrop open>
      <CircularProgress />
    </Backdrop>
  </>
}
