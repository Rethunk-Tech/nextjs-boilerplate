import type { LinkProps as MuiLinkProps } from '@mui/material/Link'
import MuiLink from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import type { LinkProps as NextLinkProps } from 'next/link'
import NextLink from 'next/link'
import type { NextRouter } from 'next/router'
import { useRouter } from 'next/router'
import { AnchorHTMLAttributes, forwardRef } from 'react'

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({})

interface NextLinkComposedProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick' | 'onMouseEnter' | 'onTouchStart'>,
    Omit<NextLinkProps, 'href' | 'as'> {
  href?: NextLinkProps['href']
  linkAs?: NextLinkProps['as']
  to: NextLinkProps['href']
}

export const NextLinkComposed = forwardRef<
  HTMLAnchorElement,
  NextLinkComposedProps
>(function NextLinkComposed(props, ref): JSX.Element {
  const {
    to,
    linkAs,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    href,
    replace,
    scroll,
    shallow,
    prefetch,
    locale,
    ...other
  } = props

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  )
})

export type LinkProps = {
  activeClassName?: string
  as?: NextLinkProps['as']
  href: NextLinkProps['href']
  linkAs?: NextLinkProps['as'] // Useful when the as prop is shallow by styled().
  noLinkStyle?: boolean
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  props,
  ref
) {
  const {
    activeClassName = 'active',
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    role, // Link don't have roles.
    ...other
  } = props

  const router: NextRouter = useRouter()
  const pathname = typeof href === 'string' ? href : href.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName
  })

  const isExternal =
    typeof href === 'string' &&
    (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0)

  if (isExternal) {
    if (noLinkStyle) {
      return <Anchor className={className} href={href} ref={ref} {...other} />
    }

    return <MuiLink className={className} href={href} ref={ref} {...other} />
  }

  if (noLinkStyle) {
    return (
      <NextLinkComposed className={className} ref={ref} to={href} {...other} />
    )
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      ref={ref}
      to={href}
      {...other}
    />
  )
})

export default Link
