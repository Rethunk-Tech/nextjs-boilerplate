import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import ExerciseInfoDialog from 'components/shared/ExerciseInfoDialog'
import ExerciseListItem from 'components/shared/ExerciseListItem'
import { useCallback, useEffect, useState } from 'react'
import { Exercise } from 'types/Exercise'

type Props = {
  exercise: Exercise | null
  onSelect: (exercise: Exercise) => void
  search: string
}

export default function ExerciseSearch(props: Props): JSX.Element | null {
  const {
    exercise: selectedExercise,
    onSelect,
    search,
  } = props

  const [exercises, setExercises] = useState<Exercise[]>([])

  const handleSelect = useCallback((exercise: Exercise) => {
    if (!onSelect || !exercise) return

    onSelect(exercise)
  }, [onSelect])

  const supabase = useSupabaseClient()
  useEffect(() => {
    if (!supabase) return
    if (search == '' && !selectedExercise?.id) return

    const fetchExercises = async (): Promise<void> => {
      let query = supabase.from('exercises').select('*')

      if (selectedExercise?.id) {
        query = query.or(`id.eq.${selectedExercise.id}`)
      }

      // partial name or category or subcategory match using POSTGRESQL syntax
      query = query.or(`name.ilike.%${search}%,category.ilike.%${search}%,subcategory.ilike.%${search}%,functional_group.ilike.%${search}%`)

      const { data, error } = await query
      if (error) {
        console.error('Error fetching exercises:', error)
        return
      }

      setExercises(data)
    }

    fetchExercises()
  }, [search, selectedExercise, supabase])

  const [showInfoFor, setShowInfoFor] = useState<Exercise | null>(null)
  const handleInfo = useCallback((exercise: Exercise) => {
    setShowInfoFor(exercise)
  }, [])

  return <Collapse in={!!exercises.length}>
    <Box
      sx={{
        display:             'grid',
        // fit multiple per row
        gridAutoFlow:        'row',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap:                 2,
      }}
    >
      {showInfoFor && <ExerciseInfoDialog
        exercise={showInfoFor}
        onClose={() => setShowInfoFor(null)}
        role="clinician"
      />}

      {exercises.map(exercise => <ExerciseListItem
        exercise={exercise}
        key={exercise.id}
        onInfo={handleInfo}
        onSelect={handleSelect}
        selected={selectedExercise?.id === exercise.id}
      />)}
    </Box>
  </Collapse>
}
