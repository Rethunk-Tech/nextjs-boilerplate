import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import { alpha, type Theme } from '@mui/material/styles'

type Props = {
  /**
   * Color of the button
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

  /**
   * Whether the button is disabled
   */
  disabled?: boolean

  /**
   * The icon to display in the button
   */
  icon: JSX.Element

  /**
   * The label to display under the button
   */
  label: string

  /**
   * The layout of the button
   */
  layout?: 'horizontal' | 'vertical'

  /**
   * The size of the button
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * The function to call when the button is clicked
   */
  onClick?: () => void
}

export default function LabeledIconButton(props: Props): JSX.Element {
  const {
    color,
    disabled,
    icon,
    label,
    layout = 'vertical',
    size = 'large',
    onClick,
  } = props

  return <Card>
    <CardActionArea
      disabled={disabled}
      onClick={onClick}
      sx={{
        color: (theme: Theme) => color
          ? theme.palette[color]?.contrastText
          : disabled
            ? theme.palette.text.secondary
            : theme.palette.text.primary,
        backgroundColor: (theme: Theme) => color
          ? alpha(theme.palette[color]?.main, 0.75)
          : 'transparent',

        display:       'flex',
        flexDirection: layout === 'horizontal' ? 'row' : 'column',
        gap:           layout === 'horizontal' ? 2 : 0,

        px:        size === 'small' ? 3 : 4,
        py:        1,
        textAlign: 'center',

        '.MuiSvgIcon-root': {
          fontSize: size === 'medium'
            ? '4rem'
            : size === 'small'
              ? '2em'
              : '8rem',
        },
      }}
    >
      {icon}

      <Typography variant="h5">
        {label}
      </Typography>
    </CardActionArea>
  </Card>
}
