import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Toolbar from '@mui/material/Toolbar'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import AppBar from 'components/shared/AppBar'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { PROGRAMS_TABLE } from 'types/Program'

/**
 * Clinician Patient's Program Redirect Page
 * 
 * @description ...
 * 
 * @returns {JSX.Element} JSX.Element - NextJS format page
 */
export default function ClinicianPatientProgramTodayPage(): JSX.Element {
  const router = useRouter()
  const patientID = router.query.patientID as string
  
  const supabase = useSupabaseClient()
  const [navigating, setNavigating] = useState(false)
  const timeout = useRef<number>()
  useEffect(() => {
    if (!patientID || navigating) return

    timeout.current = window.setTimeout(() => {
      supabase
        .from(PROGRAMS_TABLE)
        .insert({ patient_id: patientID })
        .select()
        .then(({ data, error }) => {
          if (error) {
            console.error(error)
            return
          }

          setNavigating(true)

          if (!data?.length) router.push(`/clinician/${patientID}/program/new`)
          else router.push(`/clinician/${patientID}/program/${data[0].id}`)
        })
    }, 500)

    return () => {
      if (timeout.current) window.clearTimeout(timeout.current)
    }
  }, [navigating, patientID, router, supabase, timeout])

  return <>
    <Head>
      <title>Range of Motion</title>
    </Head>

    <AppBar role="clinician" patientID={patientID} />
    <Toolbar />

    <Backdrop open>
      <CircularProgress />
    </Backdrop>
  </>
}
