import AddIcon from '@mui/icons-material/Add'
import PerformanceIcon from '@mui/icons-material/BarChart'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ProgramIcon from '@mui/icons-material/PlaylistPlay'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import LabeledIconButton from 'components/mui/LabeledIconButton'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { PROGRAMS_TABLE, Program } from 'types/Program'

type Props = {
  patientID: string
  role: 'clinician' | 'patient'
}

export default function ProgramList(props: Props): JSX.Element {
  const {
    role,
    patientID,
  } = props

  const router = useRouter()
  const supabase = useSupabaseClient()

  const [programs, setPrograms] = useState<Partial<Program>[]>([])
  useEffect(() => {
    if (!patientID || !supabase) return

    supabase
      .from(PROGRAMS_TABLE)
      .select('*')
      .eq('patient_id', patientID)
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
          return
        }

        if (data?.length) setPrograms(data)
      })
  }, [patientID, role, router, supabase])

  return <Paper
    sx={{
      display: 'grid',
      flex:    1,
      gap:     5,

      p: role === 'patient' ? 10 : 3,
    }}
  >
    {role === 'patient' ? <Box
      sx={{
        gridColumn: 'span 3',
        textAlign:  'center',
      }}
    >
      <Typography variant="h3">
        Your Exercise Program
      </Typography>
    </Box> : null}

    {role === 'clinician' ? <Box
      sx={{
        display:       'flex',
        flexDirection: 'row',
        gap:           4,
        overflowY:     'auto',
        overflowX:     'hidden',
      }}
    >
      <List
        sx={{
          display: 'grid',
          flex:    1,
          gap:     1,
        }}
      >
        {programs.map(program => <Card key={program.id}><ListItemButton
          onClick={() => router.push(`/clinician/${patientID}/program/${program.id}`)}
        >
          <ListItemText
            primary={program.name ?? 'Untitled Program'}
            secondary={new Date(program.created_at ?? 0).toLocaleDateString()}
          />
        </ListItemButton></Card>)}
      </List>
      <Box
        sx={{
          display:       'grid',
          placeItems:    'center',
          flexDirection: 'column',
          gap:           1,
        }}
      >
        <LabeledIconButton
          icon={<AddIcon />}
          label="New Program"
          onClick={() => router.push(`/clinician/${patientID}/program/new`)}
        />
      </Box>
    </Box> : <>
      <LabeledIconButton
        disabled
        icon={<PerformanceIcon />}
        label="Past Performance"
      />
      <LabeledIconButton
        icon={<ProgramIcon />}
        label="View Program"
        onClick={() => router.push(`/patient/${patientID}/program/latest`)}
      />
      <LabeledIconButton
        onClick={() => router.push(`/patient/${patientID}/program/startLatest`)}
        icon={<PlayArrowIcon />}
        label="Start"
      />
    </>}
  </Paper>
}
