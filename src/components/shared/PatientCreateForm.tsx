import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { useCallback, useState, type ChangeEvent } from 'react'
import type { Profile } from 'types/Profile'

type Props = {
  noun: string
}

export default function PatientCreateForm(props: Props): JSX.Element {
  const {
    noun,
  } = props

  const [patient, setPatient] = useState<Profile>({} as Profile)
  
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPatient(patient => ({
      ...(patient || {} as Profile),
      [e.target.name]: e.target.value,
    }))
  }, [])

  return <Paper
    sx={{
      display:             'grid',
      gridTemplateColumns: '1fr 1fr',

      gap: 2,
      p:   3,
    }}
  >
    <TextField
      disabled={!patient}
      fullWidth
      label="First Name"
      name="first_name"
      onChange={handleChange}
      required
      value={patient?.first_name ?? ''}
    />

    <TextField
      disabled={!patient}
      fullWidth
      label="Last Name"
      name="last_name"
      onChange={handleChange}
      required
      value={patient?.last_name ?? ''}
    />

    <TextField
      disabled={!patient}
      fullWidth
      label="Date of Birth"
      name="dob"
      onChange={handleChange}
      required
      value={patient?.dob ?? ''}
    />

    <TextField
      disabled={!patient}
      fullWidth
      label="Height"
      name="height"
      onChange={handleChange}
      required
      value={patient?.height ?? ''}
    />

    <TextField
      disabled={!patient}
      fullWidth
      label="Weight"
      name="weight"
      onChange={handleChange}
      required
      value={patient?.weight ?? ''}
    />

    <TextField
      disabled={!patient}
      fullWidth
      label="Sex"
      name="sex"
      onChange={handleChange}
      required
      value={patient?.sex ?? ''}
    />

    <TextField
      disabled={!patient}
      fullWidth
      label="Surgical Limb"
      name="surgical_limb"
      onChange={handleChange}
      required
      value={patient?.surgical_limb ?? ''}
    />

    <TextField
      disabled={!patient}
      fullWidth
      label="Procedure"
      name="procedure"
      onChange={handleChange}
      required
      value={patient?.procedure ?? ''}
    />

    <TextField
      disabled={!patient}
      fullWidth
      label="Injury Date"
      name="injury_date"
      onChange={handleChange}
      value={patient?.injury_date ?? ''}
    />

    <TextField
      disabled={!patient}
      fullWidth
      label="Surgery Date"
      name="surgery_date"
      onChange={handleChange}
      value={patient?.surgery_date ?? ''}
    />

    <Box
      sx={{
        gridColumnStart: 1,
        gridColumnEnd:   3,
        textAlign:       'center',
      }}
    >
      <Button
        color="primary"
        fullWidth
        variant="contained"
      >
        Create {noun}
      </Button>
    </Box>
  </Paper>
}
