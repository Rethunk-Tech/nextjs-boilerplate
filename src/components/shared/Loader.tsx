import Backdrop from '@mui/material/Backdrop'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

type Props = {
  open?: boolean
}

export default function Loader(props: Props): JSX.Element {
  const { open = true } = props

  return <Backdrop
    open={open}
    sx={{
      display:       'flex',
      flexDirection: 'column',
      gap:           2,
    }}
  >
    <Image
      alt="loading"
      height={128}
      src="/icons/favicon.ico"
      width={128}
    />
    <Typography
      color="text.secondary"
      variant="h4"
    >
      Loading...
    </Typography>
  </Backdrop>
}
