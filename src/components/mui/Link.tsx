import MuiLink from '@mui/material/Link'
import NextLink from 'next/link'
import { forwardRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Link = forwardRef((props: any, ref: any)=>{
  let { href } = props

  const { onClick } = props

  if (!href && onClick) href = '#'

  return <NextLink href={href} legacyBehavior passHref>
    <MuiLink ref={ref} {...props}/>
  </NextLink>
})

Link.displayName = 'CustomLink'

export default Link
