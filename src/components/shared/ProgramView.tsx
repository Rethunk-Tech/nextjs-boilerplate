import AddIcon from '@mui/icons-material/Add'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import CardActionArea from '@mui/material/CardActionArea'
import CircularProgress from '@mui/material/CircularProgress'
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import LabeledIconButton from 'components/mui/LabeledIconButton'
import Link from 'components/mui/Link'
import ProgramViewItem from 'components/shared/ProgramViewItem'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { PROGRAMS_TABLE, Program } from 'types/Program'
import { PROGRAM_ITEMS_TABLE, type ProgramItem } from 'types/ProgramItem'

type Props = {
  patientID: string
  programID: string
  role: 'clinician' | 'patient'
}

/**
 * Program View Component
 * 
 * @description ...
 * 
 * @returns {JSX.Element} JSX.Element
 */
export default function ProgramView(props: Props): JSX.Element {
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

    // Fetch the patient's program from the database
    // and set it to the program state
  }, [programID, supabase])

  const [programItems, setProgramItems] = useState<ProgramItem[]>([])
  useEffect(() => {
    if (!programID || !supabase) return

    supabase
      .from(PROGRAM_ITEMS_TABLE)
      .select('*')
      .eq('program_id', programID)
      .is('deleted_at', 'null')
      .then(({ data, error }) => {
        setLoading(false)

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

    // Fetch the patient's program items from the database
    // and set it to the programItems state
  }, [programID, supabase])
  
  const handleAddProgramItem = useCallback(() => {
    if (loading || role !== 'clinician') return

    supabase
      .from(PROGRAM_ITEMS_TABLE)
      .insert({
        created_at:   new Date().toISOString(),
        goal:         '',
        order:        '1',
        restrictions: '',
        reps:         '0',
        sets:         '0',
        exercise_id:  null,
        program_id:   programID ? programID : null,
      })
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
          return
        }

        if (!data) {
          console.error('Program item not created')
          return
        }

        setProgramItems(items => [...items, data[0]])
      })
  }, [loading, programID, role, supabase])

  const handleDeleteClick = useCallback((id: string) => {
    if (loading || !user) return

    // soft-delete 

    supabase
      .from(PROGRAM_ITEMS_TABLE)
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: user.id,
      })
      .eq('id', id)
      .then(({ error }) => {
        if (error) {
          console.error(error)
          return
        }

        setProgramItems(items => items.filter(x => x.id !== id))
      })
  }, [loading, supabase, user])

  const handleDuplicateClick = useCallback((id: string) => {
    if (loading) return

    const item = programItems.find(x => x.id === id)
    if (!item) return

    supabase
      .from(PROGRAM_ITEMS_TABLE)
      .insert({
        created_at:   new Date().toISOString(),
        goal:         '(Copy) ' + item.goal,
        order:        item.order,
        restrictions: item.restrictions,
        reps:         item.reps,
        sets:         item.sets,
        exercise_id:  item.exercise_id,
        program_id:   programID ? programID : null,
      })
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
          return
        }

        if (!data) {
          console.error('Program item not duplicated')
          return
        }

        setProgramItems(items => [...items, data[0]])
      })
  }, [loading, programID, programItems, supabase])

  const router = useRouter()
  const handleStartProgram = useCallback(() => {
    if (loading) return

    // Save the programItems to the database
    // and redirect to the clinician patients' page
    // redirect to the patient's program start page
    router.push(`/patient/${patientID}/program/${programID}/start`)
  }, [loading, patientID, programID, router])

  const handleStartProgramItem = useCallback((id: string) => {
    if (loading) return

    // Save the programItems[id] to the database
    // and redirect to the clinician patients' page
    console.log(`Starting program item ${id}`)
  }, [loading])

  const handleProgramNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (loading || role !== 'clinician') return

    setProgram(program => ({
      ...(program || {} as Program),
      name: e.target.value,
    }))
  }, [loading, role])

  return <>
    <Backdrop open={loading}>
      <CircularProgress />
    </Backdrop>
    <Box
      sx={{
        p:         1,
        pt:        4,
        textAlign: 'center',
      }}
    >
      {/* <IconButton
        color="primary"
        onClick={() => router.push(`/clinician/${patientID}`)}
      >
        <ArrowLeftIcon />
      </IconButton> */}
      <Typography variant="h4">
        Protocol {role == 'clinician' ? <TextField
          disabled={loading || role !== 'clinician'}
          label="Name"
          onChange={handleProgramNameChange}
          required
          size="small"
          value={program?.name ?? ''}
        /> : program?.name ?? ''} created <Link
          href={`/clinician/${patientID}`}
          sx={{ textDecoration: 'none' }}
        >
          {program?.created_at ? new Date(program.created_at).toLocaleDateString() : 'Today'}
        </Link>
      </Typography>
      {/* <IconButton
        color="primary"
        onClick={() => router.push(`/clinician/${patientID}/progress`)}
      >
        <ArrowRightIcon />
      </IconButton> */}
    </Box>

    <Box
      sx={{
        display: 'grid',
        gap:     1,
        p:       3,
      }}
    >
      {(role === 'clinician' && !programItems.length) && <Paper>
        <CardActionArea
          disabled={loading}
          onClick={handleAddProgramItem}
          sx={{
            fontSize:  '150%',
            textAlign: 'center',
            p:         3,
            width:     '100%'
          }}
        >
          Tap to Add Exercise
        </CardActionArea>
      </Paper>}

      <Collapse in={!!programItems.length}>
        <Box
          sx={{
            display: 'grid',
            gap:     1,
          }}
        >
          {programItems.map(x => <ProgramViewItem
            key={x.id}
            onDelete={id => handleDeleteClick(id)}
            onDuplicate={id => handleDuplicateClick(id)}
            onStart={id => handleStartProgramItem(id)}
            programItem={x}
            role={role}
          />)}
        </Box>
      </Collapse>

      {programItems.length > 0 && <Box
        sx={{
          display:      'grid',
          gap:          1,
          gridAutoFlow: 'column',
        }}
      >
        {role === 'clinician' && <LabeledIconButton
          disabled={loading}
          icon={<AddIcon />}
          label="Add More"
          layout="horizontal"
          onClick={handleAddProgramItem}
          size="medium"
        />}

        <LabeledIconButton
          disabled={loading || !programItems.length}
          icon={<PlayArrowIcon />}
          label="Start Program"
          layout="horizontal"
          onClick={handleStartProgram}
          size="medium"
        />
      </Box>}
    </Box>
  </>
}
