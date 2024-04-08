import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import moment, { Moment } from 'moment'
import { useRouter } from 'next/router'
import { FormEvent, useCallback, useState, type ChangeEvent } from 'react'
import { PROFILES_TABLE, type Profile } from 'types/Profile'

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
  const handleDateOfBirthChange = useCallback((value: Moment | null) => {
    if (!value) return

    setPatient(patient => ({
      ...(patient || {} as Profile),
      date_of_birth: '' + value.format('YYYY-MM-DD'),
    }))
  }, [])
  const handleInjuryDateChange = useCallback((value: Moment | null) => {
    if (!value) return

    setPatient(patient => ({
      ...(patient || {} as Profile),
      injury_date: '' + value.format('YYYY-MM-DD'),
    }))
  }, [])
  const handleSurgeryDateChange = useCallback((value: Moment | null) => {
    if (!value) return

    setPatient(patient => ({
      ...(patient || {} as Profile),
      surgery_date: '' + value.format('YYYY-MM-DD'),
    }))
  }, [])

  const router = useRouter()
  const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!patient) return
    setLoading(true)

    supabase
      .from(PROFILES_TABLE)
      .insert([patient])
      .select('*')
      .then(({ data, error }) => {
        setLoading(false)
        if (error) {
          setError(error.message)
          return
        }

        if (!data) return

        router.push(`/clinician/${data[0].id}`)
      })
  }, [patient, router, supabase])

  return <Paper
    component="form"
    onSubmit={handleSubmit}
    sx={{
      display:             'grid',
      gridTemplateColumns: '1fr 1fr',

      gap: 2,
      p:   3,
    }}
  >
    <TextField
      disabled={!patient || loading}
      fullWidth
      label="First Name"
      name="first_name"
      onChange={handleChange}
      required
      value={patient?.first_name ?? ''}
    />

    <TextField
      disabled={!patient || loading}
      fullWidth
      label="Last Name"
      name="last_name"
      onChange={handleChange}
      required
      value={patient?.last_name ?? ''}
    />

    <DatePicker
      disabled={!patient || loading}
      label="Date of Birth"
      maxDate={moment().subtract(6, 'years')}
      minDate={moment().subtract(120, 'years')}
      name="date_of_birth"
      onChange={handleDateOfBirthChange}
      value={moment(patient?.date_of_birth ?? '')}
    />

    <TextField
      disabled={!patient || loading}
      fullWidth
      inputProps={{
        type: 'number',
        max:  80,
        min:  40,
      }}
      label="Height"
      name="height"
      onChange={handleChange}
      required
      value={patient?.height ?? ''}
    />

    <TextField
      disabled={!patient || loading}
      fullWidth
      inputProps={{
        type: 'number',
        max:  500,
        min:  50,
      }}
      label="Weight"
      name="weight"
      onChange={handleChange}
      required
      value={patient?.weight ?? ''}
    />

    <TextField
      disabled={!patient || loading}
      fullWidth
      label="Procedure"
      name="procedure"
      onChange={handleChange}
      required
      value={patient?.procedure ?? ''}
    />

    <TextField
      disabled={!patient || loading}
      fullWidth
      label="Sex"
      name="sex"
      onChange={handleChange}
      required
      value={patient?.sex ?? ''}
    />

    <TextField
      disabled={!patient || loading}
      fullWidth
      label="Surgical Limb"
      name="surgical_limb"
      onChange={handleChange}
      required
      value={patient?.surgical_limb ?? ''}
    />

    <DatePicker
      disabled={!patient || loading}
      label="Injury Date"
      maxDate={moment()}
      minDate={moment().subtract(60, 'years')}
      name="injury_date"
      onChange={handleInjuryDateChange}
      value={moment(patient?.injury_date ?? '')}
    />

    <DatePicker
      disabled={!patient || loading}
      label="Surgery Date"
      maxDate={moment().add(6, 'years')}
      minDate={moment().subtract(6, 'years')}
      name="surgery_date"
      onChange={handleSurgeryDateChange}
      value={moment(patient?.surgery_date ?? '')}
    />

    <Box
      sx={{
        gridColumnStart: 1,
        gridColumnEnd:   3,
        textAlign:       'center',
      }}
    >
      <Collapse in={!!error}>
        <Alert severity="error">
          <AlertTitle>
            Could not create {noun}
          </AlertTitle>

          {error}
        </Alert>
      </Collapse>

      <Button
        color="primary"
        disabled={!patient || loading}
        fullWidth
        type="submit"
        variant="contained"
      >
        Create {noun}
      </Button>
    </Box>
  </Paper>
}
