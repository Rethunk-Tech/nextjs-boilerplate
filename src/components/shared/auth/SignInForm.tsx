import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import TextField from '@mui/material/TextField'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'components/mui/Link'
import { useRouter } from 'next/router'
import type { ChangeEvent } from 'react'
import { useCallback, useState } from 'react'

type Props = {
  role: 'clinician' | 'patient'
}

export default function SigninForm(props: Props): JSX.Element {
  const { role } = props

  const [userID, setUserID] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target

    switch (id) {
    case 'userID':
      setUserID(value)
      break
    case 'password':
      setPassword(value)
      break
    }

    setError('')
  }, [setUserID, setPassword])

  const router = useRouter()
  const supabase = useSupabaseClient()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const signinWithPassword = useCallback(() => {
    if (!supabase) return

    setError('')
    setLoading(true)

    supabase.auth.signInWithPassword({
      email:    userID,
      password: password,
    }).then(auth => {
      if (auth.error) {
        setError(auth.error.message)
        setLoading(false)
        return
      }

      router.push(`/${role}/`)
    }, reason => {
      setError(reason.error_description ?? reason.message)
      setLoading(false)
    }).catch(error => {
      setError(error.error_description ?? error.message)
      setLoading(false)
    })
  }, [userID, password, role, router, supabase])

  return <>
    <TextField
      autoFocus
      disabled={loading}
      fullWidth
      id="userID"
      label={
        role === 'clinician'
          ? 'Clinician ID or Email'
          : 'Patient ID or Email'
      }
      onChange={handleChange}
      variant="outlined"
      value={userID}
    />

    <TextField
      disabled={loading}
      fullWidth
      id="password"
      label="Password or PIN"
      onChange={handleChange}
      type="password"
      variant="outlined"
      value={password}
    />

    <Button
      color="primary"
      disabled={loading || !userID || !password}
      fullWidth
      onClick={signinWithPassword}
      size="large"
      variant="contained"
    >
      Sign In
    </Button>

    <Collapse in={!!error}>
      <Alert severity="error">
        <AlertTitle>Signin Failed</AlertTitle>
        {error}
      </Alert>
    </Collapse>

    <Box
      sx={{
        display:        'flex',
        flexDirection:  'row',
        justifyContent: 'space-between',
        px:             2,
        width:          '100%',
        
        '.MuiLink-root': {
          textDecoration: 'none',
        }
      }}
    >
      <Box
        sx={{
          display:        'flex',
          flexDirection:  'column',
          gap:            1,
          justifyContent: 'center',
        }}
      >
        <Link color="text.secondary" href={`/auth/forgot/${role}`}>
          Forgot ID/Password
        </Link>

        <Link color="text.secondary" href="/auth/signin">
          Back to Sign In
        </Link>
      </Box>

      <Box>
        {role === 'patient' && <Link color="text.secondary" href="/auth/signup/patient">
          New Patient? Sign Up
        </Link>}
      </Box>
    </Box>
  </>
}
