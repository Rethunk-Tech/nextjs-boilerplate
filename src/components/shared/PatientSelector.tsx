import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import type { SelectChangeEvent } from '@mui/material/Select'
import Select from '@mui/material/Select'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'components/mui/Link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import type { Profile } from 'types/Profile'

type Props = {
  /**
   * The noun to use for the patient (e.g. "Patient" or "Profile")
   */
  noun: string,

  /**
   * The role of the user performing the actions (e.g. "clinician" or "patient")
   */
  role: string
}

/**
 * Patient Selection Form
 * 
 * @description ...
 * 
 * @returns {JSX.Element} JSX.Element - NextJS format page
 */
export default function PatientSelector(props: Props): JSX.Element {
  const {
    noun,
    role,
  } = props

  const supabase = useSupabaseClient()

  const [patients, setPatients] = useState<Profile[]>([])
  useEffect(() => {
    const fetchPatients = async (): Promise<void> => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')

      if (error) {
        console.error(error)
        return
      }

      setPatients(data || [])
    }

    fetchPatients()
  }, [supabase])

  const [selectedPatient, setSelectedPatient] = useState<string>('')
  const handleSelection = useCallback((event: SelectChangeEvent) => {
    setSelectedPatient(event.target.value)
  }, [])

  const router = useRouter()

  return <>
    <FormControl fullWidth variant="outlined">
      <InputLabel>
        {patients.length === 0
          ? `None found. Add a ${noun} first.`
          : `Select ${noun}`}
      </InputLabel>
      <Select
        disabled={!patients.length}
        label={noun}
        onChange={handleSelection}
        value={selectedPatient}
      >
        {patients.map(x => <MenuItem
          key={x.id}
          value={x.id}
        >
          {x.last_name}, {x.first_name}
        </MenuItem>)}
      </Select>
    </FormControl>

    <Button
      color="primary"
      disabled={!selectedPatient}
      fullWidth
      onClick={() => router.push(`/${role}/${selectedPatient}/`)}
      variant="contained"
    >
      Select {noun}
    </Button>

    <Divider sx={{ my: '3vh' }}>
      OR
    </Divider>

    <Button
      fullWidth
      href={`/${role}/add-patient/`}
      LinkComponent={Link}
      variant="outlined"
    >
      New {noun}
    </Button>
    <Button
      fullWidth
      href={`/${role}/-1/`}
      LinkComponent={Link}
      variant="outlined"
    >
      One-Time {noun}
    </Button>
  </>
}
