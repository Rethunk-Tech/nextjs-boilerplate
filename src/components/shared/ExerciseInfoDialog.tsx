import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ToggleButton from '@mui/material/ToggleButton'
import Typography from '@mui/material/Typography'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useCallback, useEffect, useState } from 'react'
import { EXERCISE_DETAIL_TABLE, Exercise, ExerciseDetail } from 'types/Exercise'
import MediaEmbed from './MediaEmbed'

type Props = {
  exercise: Exercise
  role: 'clinician' | 'patient'
  onClose: () => void
}

export default function ExerciseInfoDialog(props: Props): JSX.Element {
  const { exercise, role, onClose } = props

  const supabase = useSupabaseClient()
  const [shownDetails, setShownDetails] = useState<ExerciseDetail | null>(null)
  useEffect(() => {
    if (!exercise || !supabase) return

    const fetchDetails = async (): Promise<void> => {
      const { data, error } = await supabase
        .from(EXERCISE_DETAIL_TABLE)
        .select('*')
        .eq('exercise_id', exercise.id)

      if (error) {
        console.error('Error fetching exercise details:', error)
        return
      }

      setShownDetails(data?.[0] ?? null)
    }

    fetchDetails()
  })

  const [instructionsOpen, setInstructionsOpen] = useState(role === 'patient')
  const handleCloseInfo = useCallback(() => {
    setInstructionsOpen(false)
    onClose()
  }, [onClose])

  const handleInstructionsClick = useCallback(() => {
    setInstructionsOpen(true)
  }, [])
  const handleClinicalClick = useCallback(() => {
    setInstructionsOpen(false)
  }, [])

  return <Dialog
    fullWidth
    fullScreen
    maxWidth="xl"
    onClose={handleCloseInfo}
    open={!!exercise}
  >
    <IconButton
      onClick={handleCloseInfo}
      sx={{
        position: 'absolute',
        right:    8,
        top:      8,
      }}
    >
      <CloseIcon />
    </IconButton>

    <DialogTitle>
      {exercise?.name}
    </DialogTitle>

    {instructionsOpen ? <DialogContent
      dividers
      sx={{
        display:             'grid',
        gridAutoFlow:        'dense',
        gridTemplateColumns: '1fr 1fr',
        gap:                 3,
        placeItems:          'center stretch',
      }}
    >
      <Box
        sx={{
          gridColumn: role === 'clinician' ? 1 : 2,
        }}
      >
        {shownDetails?.instructions && <>
          <Typography
            sx={{
              mt:        2,
              mb:        1,
              textAlign: role === 'patient' ? 'center' : 'left',
            }}
            variant={role === 'patient' ? 'h3' : 'h6'}
          >
            Instructions
          </Typography>
          <List disablePadding>
            {shownDetails?.instructions.trim()
              .split('\n').filter(x => x)
              .map((line, i) => <ListItem key={i}>
                {line}
              </ListItem>)}
          </List>
        </>}
      </Box>
      <Box
        sx={{
          display:       'grid',
          gridColumn:    role === 'clinician' ? 2 : 1,
          placeItems:    'center',
          flexDirection: 'column',
        }}
      >
        {(role === 'patient' && shownDetails?.summary) && <>
          <Typography sx={{ mb: 1 }} variant="h3">
            Overview
          </Typography>
          <DialogContentText sx={{ mb: 2, textAlign: 'justify' }}>
            {shownDetails?.summary}
          </DialogContentText>
        </>}

        {exercise?.primary_media && <MediaEmbed src={exercise.primary_media} />}
      </Box>
    </DialogContent> : <DialogContent
      dividers
      sx={{
        display:             'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:                 3,
        placeItems:          'center stretch',
      }}
    >
      <Box>
        <Typography variant="h6">
          Clinical Overview
        </Typography>
        <DialogContentText sx={{  textAlign: 'justify' }}>
          {shownDetails?.clinical_overview}
        </DialogContentText>

        {shownDetails?.clinical_goal && <>
          <Typography sx={{ mt: 2 }} variant="h6">
            Clinical Goal
          </Typography>
          <DialogContentText sx={{  textAlign: 'justify' }}>
            {shownDetails?.clinical_goal}
          </DialogContentText>
        </>}

        {shownDetails?.exercise_parameters && <>
          <Typography sx={{ mt: 2 }} variant="h6">
            Exercise Parameters
          </Typography>
          <DialogContentText sx={{  textAlign: 'justify' }}>
            {shownDetails?.exercise_parameters}
          </DialogContentText>
        </>}

        {shownDetails?.typical_performance && <>
          <Typography sx={{ mt: 2 }} variant="h6">
            Typical Performance
          </Typography>
          <DialogContentText sx={{  textAlign: 'justify' }}>
            {shownDetails?.typical_performance}
          </DialogContentText>
        </>}

        {shownDetails?.clinical_measurements && <>
          <Typography sx={{ mt: 2 }} variant="h6">
            Clinical Measurements
          </Typography>
          <DialogContentText sx={{  textAlign: 'justify' }}>
            {shownDetails?.clinical_measurements}
          </DialogContentText>
        </>}

        {shownDetails?.additional_text && <>
          <Typography sx={{ mt: 2 }} variant="h6">
            Additional Information
          </Typography>
          <DialogContentText sx={{  textAlign: 'justify' }}>
            {shownDetails?.additional_text}
          </DialogContentText>
        </>}
      </Box>
      <Box
        sx={{
          display:       'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6">
          Summary
        </Typography>
        <DialogContentText sx={{  textAlign: 'justify' }}>
          {shownDetails?.summary ?? '-'}
        </DialogContentText>

        {shownDetails?.normal_ranges && <>
          <Typography sx={{ mt: 2 }} variant="h6">
            Normal Ranges
          </Typography>
          <DialogContentText sx={{  textAlign: 'justify' }}>
            {shownDetails?.normal_ranges}
          </DialogContentText>
        </>}

        {shownDetails?.modifications && <>
          <Typography sx={{ mt: 2 }} variant="h6">
            Modifications
          </Typography>
          <DialogContentText sx={{  textAlign: 'justify' }}>
            {shownDetails?.modifications}
          </DialogContentText>
        </>}

        {shownDetails?.progressions && <>
          <Typography sx={{ mt: 2 }} variant="h6">
            Progressions
          </Typography>
          <DialogContentText sx={{  textAlign: 'justify' }}>
            {shownDetails?.progressions}
          </DialogContentText>
        </>}

        <Box
          sx={{
            m: 'auto',
            p: 2,

            display:             'grid',
            placeItems:          'center',
            gridTemplateColumns: '2fr 3fr',
          }}
        >
          <Typography variant="h6">
            Category
          </Typography>
          <DialogContentText>
            {exercise?.category ?? '-'}
          </DialogContentText>

          <Typography variant="h6">
            Subcategory
          </Typography>
          <DialogContentText>
            {exercise?.subcategory ?? '-'}
          </DialogContentText>

          <Typography variant="h6">
            Functional Group
          </Typography>
          <DialogContentText>
            {exercise?.functional_group ?? '-'}
          </DialogContentText>
        </Box>
      </Box>
    </DialogContent>}
    <DialogActions
      sx={{
        display:             'grid',
        gridTemplateColumns: role === 'clinician' ? '1fr 1fr 1fr' : '1fr 1fr',
        gap:                 1,
        m:                   0.5,
      }}
    >
      <ToggleButton
        onClick={handleInstructionsClick}
        selected={instructionsOpen}
        value={true}
      >
        Instructions
      </ToggleButton>
      {role === 'clinician' && <ToggleButton
        onClick={handleClinicalClick}
        selected={!instructionsOpen}
        value={false}
      >
        Clinical Information
      </ToggleButton>}
      <ToggleButton
        color="primary"
        onClick={handleCloseInfo}
        selected={true}
        value={false}
      >
        Close
      </ToggleButton>
    </DialogActions>
  </Dialog>
}
