import { Button, Collapse, Paper, TextField, Typography } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import { Box } from '@mui/system'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import AppBar from 'components/shared/AppBar'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { Exercise } from 'types/Exercise'
import { PROGRAMS_TABLE, Program } from 'types/Program'
import { PROGRAM_ITEMS_TABLE, ProgramItem } from 'types/ProgramItem'

/**
 * Program Start Page
 * 
 * @description ...
 * 
 * @returns {JSX.Element} JSX.Element - NextJS format page
 */
export default function PatientProgramStartPage(): JSX.Element {
  const router = useRouter()

  const patientID = router.query.patientID as string
  const programID = router.query.programID as string

  return <>
    <Head>
      <title>Range of Motion</title>
    </Head>

    <AppBar role="patient" patientID={patientID} />
    <Toolbar />

    <ProgramRunner
      role="patient"
      patientID={patientID}
      programID={programID}
    />
  </>
}

function ProgramRunner(props: any): JSX.Element {
  const { patientID, role, programID } = props

  const supabase = useSupabaseClient()
  const user = useUser()

  const [loading, setLoading] = useState(true)
  const [program, setProgram] = useState<Program>({} as Program)
  useEffect(() => {
    if (!programID || !supabase) return

    supabase
      .from(PROGRAMS_TABLE)
      .select('*')
      .eq('id', programID)
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
          setLoading(false)
          return
        }

        if (!data?.length) {
          console.error('Program not found')
          setLoading(false)
          return
        }

        setProgram(data[0])
      })
  }, [programID, supabase])

  const [programItems, setProgramItems] = useState<ProgramItem[]>([])
  useEffect(() => {
    if (!programID || !supabase) return

    supabase
      .from(PROGRAM_ITEMS_TABLE)
      .select('*')
      .eq('program_id', programID)
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
          return
        }

        if (!data?.length) {
          console.error('Program items not found')
          return
        }

        setProgramItems(data)
      })
  }, [programID, supabase])

  const [step, setStep] = useState(0)
  const [painLevel, setPainLevel] = useState(-1)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [exercise_id, setExerciseID] = useState<string | null>(null)
  const [exercise, setExercise] = useState<Exercise | null>(null)
  useEffect(() => {
    if (!programItems.length) return

    const currentItem = programItems[currentItemIndex]
    setExerciseID(currentItem.exercise_id)

    supabase
      .from('exercises')
      .select('*')
      .eq('id', currentItem.exercise_id)
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
          return
        }

        if (!data?.length) {
          console.error('Exercise not found')
          return
        }

        setExercise(data[0])
      })
  }, [currentItemIndex, programItems, supabase])

  const handleNext = useCallback(() => {
    if (currentItemIndex === programItems.length - 1) {
      console.log('Program completed!')
      return
    }
    
    setCurrentItemIndex(currentItemIndex + 1)
  }, [currentItemIndex, programItems])

  return <Collapse in={!!programItems.length}>
    <Box
      sx={{
        display: 'grid',
        p:       2,
        gap:     1,
      }}
    >
      <Paper
        sx={{
          flex: 1,
          p:    4
        }}
      >
        <Typography sx={{ mb: 2 }} variant="h5">
          What is your pain level?
        </Typography>

        <Box
          sx={{
            display:      'grid',
            gridAutoFlow: 'column',
            gap:          1,
            
            '& > *': {
              cursor:     'pointer',
              display:    'grid',
              minHeight:  '64px',
              placeItems: 'center',
              textAlign:  'center',
            },
          }}
        >
          {Array.from({ length: 10 }, (_, i) => i).map((i) => {
            const selected = i === painLevel
            return <Box
              key={i}
              onClick={() => setPainLevel(i)}
              sx={{
                backgroundColor: selected ? 'primary.dark' : 'transparent',
                color:           selected ? 'primary.contrastText' : undefined,
              }}
            >
              {i}
            </Box>
          })}
        </Box>
      </Paper>

      <Paper sx={{ p: 4 }}>
        <Typography sx={{ mb: 2 }} variant="h6">
          Notes to Provider
        </Typography>

        <TextField
          fullWidth
          multiline
          placeholder="Enter notes here (optional)"
          rows={2}
          variant="outlined"
        />
      </Paper>
      <Box
        sx={{
          display:        'flex',
          justifyContent: 'flex-end',
          gap:            1,
        }}
      >
        <Button
          color="primary"
          onClick={handleNext}
          size="large"
          variant="contained"
        >
          Submit
        </Button>
      </Box>
    </Box>
  </Collapse>
}
