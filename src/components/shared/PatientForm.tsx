import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import moment, { Moment } from 'moment'
import { useRouter } from 'next/router'
import type { ChangeEvent, FormEvent } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Profile } from 'types/Profile'
import { PROFILES_TABLE } from 'types/Profile'

type Props = {
  noun: string
  patientID?: string
  wide?: boolean
}

export default function PatientForm(props: Props): JSX.Element {
  const {
    noun,
    patientID,
    wide,
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

  const [remotePatient, setRemotePatient] = useState<Profile | null>(null)
  useEffect(() => {
    if (!patientID) return
    setLoading(true)

    supabase
      .from(PROFILES_TABLE)
      .select('*')
      .eq('id', patientID)
      .then(({ data, error }) => {
        setLoading(false)

        if (error) {
          console.error(error)
          return
        }

        if (!data) return

        setRemotePatient(data[0])
        setPatient(data[0])
      })
  }, [patientID, supabase])

  const haveChanges = useMemo(() => {
    if (!remotePatient) return false

    type Map = { [key: string]: string }
    const a = patient as unknown as Map
    const b = remotePatient as unknown as Map

    return Object.keys(patient).some(key => a[key] !== b[key])
  }, [patient, remotePatient])

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!patient) return
    setLoading(true)

    if (patientID) {
      supabase
        .from(PROFILES_TABLE)
        .update(patient)
        .eq('id', patientID)
        .then(({ error }) => {
          setLoading(false)
          if (error) {
            setError(error.message)
            return
          }

          router.reload()
        })

      return
    }

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
  }, [patient, patientID, router, supabase])

  return <Paper
    component="form"
    onSubmit={handleSubmit}
    sx={{
      display:             'grid',
      gridTemplateColumns: wide ? '1fr 1fr 1fr 1fr 1fr' : '1fr 1fr',

      gap: 2,
      m:   'auto',
      p:   3,
    }}
  >
    {(patientID && wide) && <>
      <Box
        sx={{
          gridColumnStart: 2,
          gridColumnEnd:   6,
          gridRowStart:    1,
          gridRowEnd:      2,

          display:             'grid',
          alignItems:          'stretch',
          justifyContent:      'stretch',
          gap:                 2,
          gridTemplateColumns: '1fr 1fr',
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
      </Box>

      <Box
        sx={{
          gridRowStart:    1,
          gridRowEnd:      4,
          gridColumnStart: 1,
          gridColumnEnd:   2,
          m:               'auto',
          textAlign:       'center',
        }}
      >
        <Avatar
          sx={{
            height: 128,
            width:  128 
          }}
        />
      </Box>
      <Box
        sx={{
          gridRowStart:    4,
          gridRowEnd:      5,
          gridColumnStart: 1,
          gridColumnEnd:   2,
        }}
      >
        <Button
          color="secondary"
          fullWidth
          variant="contained"
        >
          Upload Profile Picture
        </Button>
      </Box>
    </>}

    {!(patientID && wide) && <>
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
    </>}

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
        gridColumnStart: wide ? 2 : 1,
        gridColumnEnd:   wide ? 6 : 3,
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
        disabled={!patient || loading || (!!patientID && !haveChanges)}
        fullWidth
        type="submit"
        variant="contained"
      >
        {patientID ? 'Update' : 'Create'}
        {noun}
      </Button>
    </Box>
  </Paper>
}
