import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { alpha, type Theme } from '@mui/material/styles'
import { PATIENTS } from 'MOCK'
import Link from 'components/mui/Link'
import { useRouter } from 'next/router'

type Props = {
  patientID?: string
  role: string
}

export default function AppBar(props: Props): JSX.Element {
  const {
    patientID,
    role,
  } = props

  const user = {
    full_name: 'Blais, Damon'
  }

  const selectedPatient = PATIENTS.find(patient => patient.id === patientID)

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
            {user.full_name}
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
            {selectedPatient?.last_name}, {selectedPatient?.first_name}
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
