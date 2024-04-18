import MoreInfoIcon from '@mui/icons-material/Info'
import { Box, Button, ListItemText } from '@mui/material'
import ListItemButton from '@mui/material/ListItemButton'
import { useCallback, type MouseEvent } from 'react'
import { Exercise } from 'types/Exercise'

type Props = {
  exercise: Exercise
  onInfo: (exercise: Exercise) => void
  onSelect?: (exercise: Exercise) => void
  selected: boolean
}

export default function ExerciseListItem(props: Props): JSX.Element {
  const {
    exercise,
    onInfo,
    onSelect,
    selected,
  } = props

  const handleInfoClick = useCallback((e: MouseEvent) => {
    e.stopPropagation()
    onInfo(exercise)
  }, [exercise, onInfo])

  return <ListItemButton
    key={exercise.id}
    onClick={() => onSelect ? onSelect(exercise) : null}
    selected={selected}
  >
    <Box
      sx={{
        display:      'grid',
        gap:          1,
        gridAutoFlow: 'column',
        mr:           1,
        mt:           0.3,
      }}
    >
      <ListItemText secondary={exercise.category} />
      <ListItemText secondary={exercise.subcategory} />
      <ListItemText secondary={exercise.functional_group} />
    </Box>

    <ListItemText primary={exercise.name} />

    <Button
      onClick={handleInfoClick}
      size="large"
      sx={{ alignSelf: 'center' }}
    >
      <MoreInfoIcon />
    </Button>
  </ListItemButton>
}
