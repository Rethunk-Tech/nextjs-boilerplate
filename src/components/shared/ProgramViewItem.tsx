import DeleteIcon from '@mui/icons-material/Delete'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import CopyIcon from '@mui/icons-material/FileCopy'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SaveIcon from '@mui/icons-material/Save'
import { Paper, Tooltip } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Menu from '@mui/material/Menu'
import TextField from '@mui/material/TextField'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import ExerciseSearch from 'components/clinician/ExerciseSearch'
import LabeledIconButton from 'components/mui/LabeledIconButton'
import type { ChangeEvent, MouseEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Exercise } from 'types/Exercise'
import { PROGRAM_ITEMS_TABLE, type ProgramItem } from 'types/ProgramItem'
import ExerciseInfoDialog from './ExerciseInfoDialog'
import ExerciseListItem from './ExerciseListItem'

type Props = {
  programItem: ProgramItem
  role: 'clinician' | 'patient'

  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
  onStart: (id: string) => void
}

/**
 * Program Item View Component
 * 
 * @description ...
 * 
 * @returns {JSX.Element} JSX.Element
 */
export default function ProgramViewItem(props: Props): JSX.Element {
  const {
    programItem: savedProgramItem,
    onDelete,
    onDuplicate,
    onStart,
    role,
  } = props

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleMenuOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const supabase = useSupabaseClient()

  const [programItem, setProgramItem] = useState<ProgramItem>(savedProgramItem)
  useEffect(() => {
    setProgramItem(savedProgramItem)
  }, [savedProgramItem])

  const [hasChanged, setHasChanged] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!programItem.id || !supabase) return

    const fetchProgramItem = async (): Promise<void> => {
      if (!programItem.id) return
      setHasChanged(false)

      const { data, error } = await supabase
        .from(PROGRAM_ITEMS_TABLE)
        .select('*')
        .eq('id', programItem.id)
        .single()

      if (error) {
        console.error('Error fetching program item:', error.message)
        return
      }

      setProgramItem(data)
    }

    fetchProgramItem()
  }, [programItem.id, supabase])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setHasChanged(true)
    setProgramItem({
      ...programItem,
      [name]: value,
    })
  }, [programItem])

  const [exercise, setExercise] = useState<Exercise>({} as Exercise)
  useEffect(() => {
    if (!programItem.id || !programItem.exercise_id) return

    const fetchExercise = async (): Promise<void> => {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('id', programItem.exercise_id)
        .single()

      if (error) {
        console.error('Error fetching exercise:', error.message)
        return
      }

      setExercise(data)
    }

    fetchExercise()
  }, [programItem, supabase])

  const handleCreateClick = useCallback(() => {
    if (!hasChanged && programItem.id) return

    // unset id
    if (!programItem.id) delete (programItem.id)
    else return // don't create if the item already exists

    supabase
      .from(PROGRAM_ITEMS_TABLE)
      .insert(programItem)
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.error('Error saving program item:', error.message)
          return
        }

        if (!data) return

        setProgramItem(data[0])
        setHasChanged(false)
      })
  }, [hasChanged, programItem, supabase])

  const handleUpdateClick = useCallback(() => {
    if (!hasChanged || !programItem.id) return

    supabase
      .from(PROGRAM_ITEMS_TABLE)
      .update(programItem)
      .eq('id', programItem.id)
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.error('Error updating program item:', error.message)
          return
        }

        if (!data) return

        setProgramItem(data[0])
        setHasChanged(false)
      })
  }, [hasChanged, programItem, supabase])

  const [showInfo, setShowInfo] = useState(false)
  const handleInfo = useCallback(() => {
    setShowInfo(true)
  }, [])
  const handleCloseInfo = useCallback(() => {
    setShowInfo(false)
  }, [])

  return <Paper
    sx={{
      display:             'grid',
      placeItems:          'center',
      gap:                 2,
      p:                   2,
      px:                  3,
      gridTemplateColumns: role === 'clinician'
        ? '64px 2fr 1fr 1fr 96px 96px 64px'
        : '2fr 1fr 96px 96px 64px',
    }}
  >
    {role == 'clinician' && <Button
      color={hasChanged ? 'secondary' : 'success'}
      fullWidth
      onClick={programItem.id ? handleUpdateClick : handleCreateClick}
      sx={{ height: '100%' }}
      variant="outlined"
    >
      {hasChanged ? <Tooltip title="Changes to this line have not yet been saved.">
        <SaveIcon color='secondary' />
      </Tooltip> : <DragHandleIcon />}
    </Button>}

    {role == 'clinician' ? <TextField
      autoComplete='no'
      fullWidth
      label="Exercise"
      onChange={(event) => setSearchTerm(event.target.value)}
      value={searchTerm}
      variant="outlined"
    /> : <ExerciseListItem
      exercise={exercise}
      key={exercise.id}
      onInfo={handleInfo}
      selected={true}
    />}

    {(role === 'patient' && showInfo) && <ExerciseInfoDialog
      exercise={exercise}
      onClose={handleCloseInfo}
      role="patient"
    />}

    <TextField
      autoComplete='no'
      disabled={role === 'patient'}
      fullWidth
      label="Goal"
      name="goal"
      onChange={handleChange}
      variant="outlined"
      value={programItem.goal}
    />

    {role == 'clinician' && <TextField
      fullWidth
      label="Restrictions"
      name="restrictions"
      onChange={handleChange}
      variant="outlined"
      value={programItem.restrictions}
    />}

    <TextField
      autoComplete='no'
      disabled={role === 'patient'}
      fullWidth
      label="Sets"
      name="sets"
      onChange={handleChange}
      type="number"
      variant="outlined"
      value={programItem.sets}
    />

    <TextField
      autoComplete='no'
      disabled={role === 'patient'}
      fullWidth
      label="Reps"
      name="reps"
      onChange={handleChange}
      type="number"
      variant="outlined"
      value={programItem.reps}
    />

    {role == 'clinician' ? <Button
      color="inherit"
      fullWidth
      onClick={handleMenuOpen}
      sx={{ height: '100%' }}
      variant="text"
    >
      <MoreHorizIcon />
    </Button> : <Button
      color="inherit"
      fullWidth
      onClick={handleInfo}
      sx={{ height: '88%' }}
      variant="outlined"
    >
      <PlayArrowIcon />
    </Button>}

    {(role == 'clinician' && (searchTerm || exercise?.id)) && <List
      sx={{
        gridColumn: 'span 7',

        '&, & > *': {
          flex:  1,
          width: '100%',
        }
      }}
    >
      <ExerciseSearch
        exercise={exercise}
        onSelect={(exercise) => {
          setProgramItem(x => ({
            ...x,
            exercise_id: exercise.id ?? null,
          }))
          setExercise(exercise)
          setSearchTerm(exercise.name)
          setHasChanged(true)
        }}
        search={searchTerm}
      />
    </List>}

    {role == 'clinician' && <Backdrop
      open={Boolean(anchorEl)}
      onClick={handleMenuClose}
    >
      <Menu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        open={Boolean(anchorEl)}
        sx={{
          '.MuiList-root': {
            display:        'flex',
            flexDirection:  'row-reverse',
            alignItems:     'center',
            gap:            2,
            justifyContent: 'center',

            mx: 4,
            my: 2,
          },
        }}
      >
        <LabeledIconButton
          color="success"
          disabled={!programItem.id}
          icon={<PlayArrowIcon />}
          label="Start"
          layout="horizontal"
          onClick={() => onStart(programItem.id || '')}
          size="small"
        />

        <LabeledIconButton
          disabled={!programItem.id}
          icon={<CopyIcon />}
          key="duplicate"
          label="Duplicate"
          layout="horizontal"
          onClick={() => onDuplicate(programItem.id || '')}
          size="small"
        />

        <LabeledIconButton
          color="error"
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          layout="horizontal"
          onClick={() => onDelete(programItem.id || '')}
          size="small"
        />
      </Menu>
    </Backdrop>}
  </Paper>
}
