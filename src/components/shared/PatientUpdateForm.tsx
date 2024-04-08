import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { PATIENTS } from 'MOCK'
import { useCallback, useEffect, useState, type ChangeEvent } from 'react'
import type { Profile } from 'types/Profile'

type Props = {
  noun: string

  patientID: string
}

export default function PatientUpdateForm(props: Props): JSX.Element {
  const {
    noun,
    patientID,
  } = props

  const selectedPatient = PATIENTS.find(patient => patient.id === patientID)

  const [patient, setPatient] = useState<Profile | null>()
  useEffect(() => {
    if (selectedPatient && !patient) {
      setPatient(selectedPatient)
    }
  }, [selectedPatient, patient])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPatient(patient => ({
      ...(patient || {} as Profile),
      [e.target.name]: e.target.value,
    }))
  }, [])

  return <Paper
    sx={{
      display:             'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',

      gap: 2,
      p:   3,
    }}
  >
    <Box
      sx={{
        gridColumn: 'span 5',
        mb:         2, 
        textAlign:  'center',
      }}
    >
      <Typography variant="h3">
        Update {noun.charAt(0).toUpperCase() + noun.slice(1)}
      </Typography>
    </Box>

    <Box
      sx={{
        gridColumn: 'span 1',
        gridRow:    'span 3',
        
        display:        'flex',
        justifyContent: 'center',
        alignItems:     'center',
      }}
    >
      <Avatar
        sx={{
          height: 128,
          width:  128,
        }}
      />
    </Box>

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
        gridColumnEnd:   2,
      }}
    >
      <Button
        color="secondary"
        fullWidth
        variant="contained"
      >
        Replace Image
      </Button>
    </Box>

    <Box
      sx={{
        gridColumnStart: 2,
        gridColumnEnd:   6,
        textAlign:       'center',
      }}
    >
      <Button
        color="primary"
        fullWidth
        variant="contained"
      >
        Update {noun} Information
      </Button>
    </Box>
  </Paper>
}
