import PatientIcon from '@mui/icons-material/Person'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import SigninForm from 'components/shared/auth/SignInForm'
import Head from 'next/head'

/**
 * Patient Signin Page
 * 
 * @description ...
 * 
 * @returns {JSX.Element} JSX.Element - NextJS format page
 */
export default function PatientSignin(): JSX.Element {
  return <>
    <Head>
      <title>Range of Motion</title>
    </Head>

    <Box
      sx={{
        display:             'grid',
        gridTemplateColumns: '1fr 2fr',

        height:    '100%',
        minHeight: '100svh',

        '& > *': {
          display:        'flex',
          alignItems:     'center',
          flexDirection:  'column',
          justifyContent: 'center',
        }
      }}
    >
      <Paper
        elevation={12}
        sx={{
          borderRadius: 0,
          px:           6,
          textAlign:    'left',
        }}
      >
        <PatientIcon sx={{ fontSize: '12em' }} />

        <Typography gutterBottom variant="h2">
          Patient Sign In
        </Typography>

        <Typography variant="body1">
          Access your exercise plan and progress
        </Typography>
      </Paper>

      <Box
        sx={{
          alignItems: 'stretch',
          gap:        2,
          maxWidth:   600,
          mx:         'auto',
          width:      '30vw',
        }}
      >
        <SigninForm role="patient" />
      </Box>
    </Box>
  </>
}
