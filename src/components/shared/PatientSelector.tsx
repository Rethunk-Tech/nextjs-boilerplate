import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { PATIENTS } from 'MOCK'
import { useRouter } from 'next/router'
import { useState } from 'react'
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

  const [selectedPatient, setSelectedPatient] = useState<string>('')
  const [patients] = useState<Profile[]>(PATIENTS)

  const router = useRouter()

  return <>
    <FormControl fullWidth variant="outlined">
      <InputLabel>{noun}</InputLabel>
      <Select
        label={noun}
        onChange={e => setSelectedPatient(e.target.value)}
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
      variant="outlined"
    >
      New {noun}
    </Button>
    <Button
      fullWidth
      href={`/${role}/-1/`}
      variant="outlined"
    >
      One-Time {noun}
    </Button>
  </>
}
