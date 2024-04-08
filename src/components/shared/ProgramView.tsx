import AddIcon from '@mui/icons-material/Add'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LabeledIconButton from 'components/mui/LabeledIconButton'
import Link from 'components/mui/Link'
import ProgramItem from 'components/shared/ProgramItem'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

type Props = {
  patientID: string
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
  const { patientID, role } = props

  const [programItems, setProgramItems] = useState([{}])
  useEffect(() => {
    // Fetch the patient's program from the database
    // and set it to the programItems state
  }, [])

  const handleAddProgramItem = useCallback(() => {
    setProgramItems(items => [...items, {}])
  }, [])

  const handleStartProgram = useCallback(() => {
    // Save the programItems to the database
    // and redirect to the clinician patients' page
    console.log('Starting program')
  }, [])

  const handleStartProgramItem = useCallback((id: string) => {
    // Save the programItems[id] to the database
    // and redirect to the clinician patients' page
    console.log(`Starting program item ${id}`)
  }, [])

  const date = new Date().toLocaleDateString()

  const router = useRouter()

  return <>
    <Box
      sx={{
        display:             'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        placeItems:          'baseline center',
        mt:                  4,
      }}
    >
      <IconButton
        color="primary"
        onClick={() => router.push(`/clinician/${patientID}`)}
      >
        <ArrowLeftIcon />
      </IconButton>
      <Typography variant="h4">
        Protocol for <Link
          onClick={() => { }}
          sx={{ 
            textDecoration: 'none',
          }}
        >
          {date}
        </Link>
      </Typography>
      <IconButton
        color="primary"
        onClick={() => router.push(`/clinician/${patientID}/progress`)}
      >
        <ArrowRightIcon />
      </IconButton>
    </Box>

    <Box
      sx={{
        display: 'grid',
        gap:     1,
        p:       3,
      }}
    >
      {programItems.map((item, index) => <ProgramItem
        key={index}
        id={index.toString()}
        onDelete={id => setProgramItems(items => items.filter((_, i) => i !== +id))}
        onDuplicate={id => setProgramItems(items => {
          const newItem = { ...items[+id] }
          return [...items, newItem]
        })}
        onStart={id => handleStartProgramItem(id)}
        role={role}
      />)}

      <Box
        sx={{
          display:      'grid',
          gap:          1,
          gridAutoFlow: 'column',
        }}
      >
        {role === 'clinician' && <LabeledIconButton
          icon={<AddIcon />}
          label="Add More"
          layout="horizontal"
          onClick={handleAddProgramItem}
          size="medium"
        />}

        <LabeledIconButton
          icon={<PlayArrowIcon />}
          label="Start Program"
          layout="horizontal"
          onClick={handleStartProgram}
          size="medium"
        />
      </Box>
    </Box>
  </>
}
