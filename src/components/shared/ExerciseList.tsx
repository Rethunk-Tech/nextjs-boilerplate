import AddIcon from '@mui/icons-material/Add'
import PerformanceIcon from '@mui/icons-material/BarChart'
import EditIcon from '@mui/icons-material/Edit'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ProgramIcon from '@mui/icons-material/PlaylistPlay'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import LabeledIconButton from 'components/mui/LabeledIconButton'
import { useRouter } from 'next/router'

type Props = {
  patientID: string
  role: 'clinician' | 'patient'
}

export default function ExerciseList(props: Props): JSX.Element {
  const {
    role,
    patientID,
  } = props

  const router = useRouter()

  return <Paper
    sx={{
      display:        'grid',
      alignItems:     'center',
      justifyContent: 'space-evenly',

      p: 3,
    }}
  >
    <Box
      sx={{
        gridColumn: 'span 3',
        textAlign:  'center',
      }}
    >
      {role === 'patient' ? <Typography variant="h3">
        Your Exercise Program
      </Typography> : null}
    </Box>

    {role === 'clinician' && <>
      <LabeledIconButton
        icon={<AddIcon />}
        label="New Exercise"
      />
      <LabeledIconButton
        icon={<EditIcon />}
        label="Edit Exercise"
        onClick={() => router.push(`/${role}/${patientID}/program`)}
      />
    </>}
    {role === 'patient' && <>
      <LabeledIconButton
        disabled
        icon={<PerformanceIcon />}
        label="Past Performance"
      />
      <LabeledIconButton
        icon={<ProgramIcon />}
        label="View Program"
        onClick={() => router.push(`/${role}/${patientID}/program`)}
      />
    </>}
    
    <LabeledIconButton
      icon={<PlayArrowIcon />}
      label="Start"
    />
  </Paper>
}
