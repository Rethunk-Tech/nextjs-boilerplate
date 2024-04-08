import DeleteIcon from '@mui/icons-material/Delete'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import CopyIcon from '@mui/icons-material/FileCopy'
import InfoIcon from '@mui/icons-material/Info'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import TextField from '@mui/material/TextField'
import LabeledIconButton from 'components/mui/LabeledIconButton'
import type { MouseEvent } from 'react'
import { useCallback, useState } from 'react'

type Props = {
  id: string
  role: 'clinician' | 'patient'

  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
  onStart: (id: string) => void
}

/**
 * Program Item Component
 * 
 * @description ...
 * 
 * @returns {JSX.Element} JSX.Element
 */
export default function ProgramItem(props: Props): JSX.Element {
  const {
    id,
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

  const [exercise, setExercise] = useState('')

  return <ListItemButton
    sx={{
      display:             'grid',
      placeItems:          'center',
      gap:                 2,
      p:                   2,
      gridTemplateColumns: '64px 2fr 1fr 1fr 96px 96px 64px',
    }}
  >
    <Button
      color="inherit"
      disabled
      fullWidth
      sx={{ height: '100%' }}
      variant="text"
    >
      <DragHandleIcon />
    </Button>

    <TextField
      disabled={role === 'patient'}
      fullWidth
      label="Exercise"
      onChange={(event) => setExercise(event.target.value)}
      variant="outlined"
      value={exercise}
    />

    <TextField
      disabled={role === 'patient'}
      fullWidth
      label="Goal"
      variant="outlined"
    />

    <TextField
      disabled={role === 'patient'}
      fullWidth
      label="Restrictions"
      variant="outlined"
    />

    <TextField
      disabled={role === 'patient'}
      fullWidth
      label="Sets"
      type="number"
      variant="outlined"
    />

    <TextField
      disabled={role === 'patient'}
      fullWidth
      label="Reps"
      type="number"
      variant="outlined"
    />

    <Button
      color="inherit"
      fullWidth
      onClick={handleMenuOpen}
      sx={{ height: '100%' }}
      variant="text"
    >
      <MoreHorizIcon />
    </Button>

    {exercise && <List
      sx={{
        gridColumn: 'span 7',
      }}
    >
      <ListItemButton>
        <ListItemText
          primary="Exercise Search Result"
          secondary="Tags: ACL, Knee Extension"
        />
      </ListItemButton>
      <ListItemButton>
        <ListItemText
          primary="Exercise Search Result"
          secondary="Tags: Range of Motion"
        />
      </ListItemButton>
      <ListItemButton>
        <ListItemText
          primary="Exercise Search Result"
          secondary="Tags: AAROW, Flexion"
        />
      </ListItemButton>
      <ListItemButton>
        <ListItemText
          primary="Exercise Search Result"
          secondary="Tags: Hamstring, Strengthening"
        />
      </ListItemButton>
    </List>}

    <Backdrop
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
          icon={<PlayArrowIcon />}
          label="Start"
          layout="horizontal"
          onClick={() => onStart(id)}
          size="small"
        />

        {role === 'clinician' ? <>
          <LabeledIconButton
            icon={<CopyIcon />}
            label="Duplicate"
            layout="horizontal"
            onClick={() => onDuplicate(id)}
            size="small"
          />

          <LabeledIconButton
            color="error"
            icon={<DeleteIcon />}
            label="Delete"
            layout="horizontal"
            onClick={() => onDelete(id)}
            size="small"
          />
        </> : <LabeledIconButton
          color="info"
          icon={<InfoIcon />}
          label="Info"
          layout="horizontal"
          onClick={() => console.log('Info')}
          size="small"
        />}
      </Menu>
    </Backdrop>
  </ListItemButton>
}
