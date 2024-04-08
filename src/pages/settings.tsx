import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CLINICS_TABLE } from 'types/Clinic'

/**
 * Settings page
 * 
 * @description Allows users to view and change their device settings.
 * 
 * @returns {JSX.Element} JSX.Element - NextJS format page
 */
export default function SettingsPage(): JSX.Element {
  const router = useRouter()
  const supabase = useSupabaseClient()

  const [clinics, setClinics] = useState<string[]>([])
  useEffect(() => {
    if (!supabase) return

    const fetchClinics = async (): Promise<void> => {
      const { data, error } = await supabase
        .from(CLINICS_TABLE)
        .select('display_name')

      if (error) {
        console.error('Error fetching clinics:', error.message)
        return
      }

      // assert data is Clinic[]
      if (!data || !Array.isArray(data)) {
        console.error('No clinics found')
        return
      }

      setClinics(data.map(clinic => clinic.display_name))
    }
    
    fetchClinics()
  }, [supabase])

  return <Box
    sx={{
      height: '100svh',

      '&, & > *': {
        display:    'grid',
        placeItems: 'center',
        textAlign:  'center',
      },
    }}
  >
    <Box>
      <Typography
        sx={{ mb: 1 }}
        variant="h2"
      >
        Settings
      </Typography>

      <Button
        color="primary"
        onClick={router.back}
        sx={{ mb: 4 }}
        variant="text"
      >
        Back
      </Button>

      <Paper
        elevation={3}
        sx={{ maxWidth: 520, p: 3 }}
      >
        <Typography sx={{ mb: 1 }} variant="h5">
          Device Not Associated
        </Typography>

        <Typography sx={{ mb: 2 }} variant="body1">
          This device is not associated with any clinic. Please contact your Administrator for assistance in setting up this device. To set up this device, start by selecting a clinic from the list below.
        </Typography>

        {clinics.length > 0 && <FormControl>
          <Select fullWidth>
            <MenuItem value="">Select a Clinic</MenuItem>
            {clinics.map(clinic => <MenuItem key={clinic} value={clinic}>
              {clinic}
            </MenuItem>)}
          </Select>
        </FormControl>}
      </Paper>

      <Button
        color="primary"
        onClick={() => router.push('/auth/signin')}
        sx={{ mt: 4 }}
        variant="contained"
      >
        Sign In
      </Button>
    </Box>
  </Box>
}
