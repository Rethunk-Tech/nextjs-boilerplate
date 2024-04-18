import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { alpha, type Theme } from '@mui/material/styles'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Link from 'components/mui/Link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import type { Profile } from 'types/Profile'
import { PROFILES_TABLE } from 'types/Profile'

type Props = {
  patientID?: string
  role: string
}

export default function AppBar(props: Props): JSX.Element {
  const {
    patientID,
    role,
  } = props

  const supabase = useSupabaseClient()
  const user = useUser()

  const [patient, setPatient] = useState<Profile>({} as Profile)
  useEffect(() => {
    if (!patientID) return

    const fetchPatient = async (): Promise<void> => {
      const { data, error } = await supabase
        .from(PROFILES_TABLE)
        .select('*')
        .eq('id', patientID)
        .single()

      if (error) {
        console.error('Error fetching patient:', error)
        return
      }

      setPatient(data)
    }

    fetchPatient()
  }, [patientID, supabase])

  const router = useRouter()

  return <MuiAppBar enableColorOnDark>
    <Toolbar>
      <Paper
        sx={{
          backgroundColor: (theme: Theme) => alpha(theme.palette.background.paper, 0.5),
          borderRadius:    0.5,
          px:              1,
          mr:              1,

          cursor:     'pointer',
          userSelect: 'none',
          'a':        {
            color:          'inherit',
            textDecoration: 'none',
          }
        }}
      >
        <Link href={`/${role}`}>
          <Typography sx={{ lineHeight: 0.75, mt: 1 }} variant="h6">
            {user?.user_metadata.full_name || user?.email}
          </Typography>
          <Typography variant="caption">
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Typography>
        </Link>
      </Paper>
      {patientID ? <Paper
        sx={{
          backgroundColor: (theme: Theme) => alpha(theme.palette.background.paper, 0.5),
          borderRadius:    0.5,
          px:              1,
          mr:              1,

          cursor:     'pointer',
          userSelect: 'none',
          'a':        {
            color:          'inherit',
            textDecoration: 'none',
          }
        }}
      >
        <Link href={`/${role}/${patientID}`}>
          <Typography sx={{ lineHeight: 0.75, mt: 1 }} variant="h6">
            {patient?.last_name}, {patient?.first_name}
          </Typography>
          <Typography variant="caption">
            {role === 'clinician' ? 'Patient' : 'Profile'}
          </Typography>
        </Link>
      </Paper> : null}
      <Box sx={{ flex: 1 }} />
      <Button
        color="error"
        onClick={() => router.push('/auth/signin')}
        variant="contained"
      >
        Sign Out
      </Button>
    </Toolbar>
  </MuiAppBar>
}
