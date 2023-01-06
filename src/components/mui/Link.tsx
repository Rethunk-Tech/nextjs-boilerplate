import MuiLink from '@mui/material/Link'
import NextLink from 'next/link'
import { forwardRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Link = forwardRef((props: any, ref:any)=>{
  const { href } = props
  return <NextLink href={href} legacyBehavior passHref>
    <MuiLink ref={ref} {...props}/>
  </NextLink>
})

Link.displayName = 'CustomLink'

export default Link

// const theme = createTheme({
//   components: {
//     MuiLink: {
//       defaultProps: {
//         component: Link
//       }
//     },
//     MuiButtonBase: {
//       defaultProps: {
//         LinkComponent: Link
//       }
//     }
//   }
// })
