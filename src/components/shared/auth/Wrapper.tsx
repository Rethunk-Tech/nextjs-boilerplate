import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Loader from 'components/shared/Loader'
import AuthRequired from 'components/shared/auth/Required'
import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'

export default function AuthWrapper(props: PropsWithChildren): JSX.Element {
  const supabase = useSupabaseClient()
  const user = useUser()

  const [loggedIn, setLoggedIn] = useState<boolean>()
  useEffect(() => {
    async function userLoggedIn(): Promise<boolean> {
      if (user) return true

      const {
        data: { session }
      } = await supabase.auth.getSession()

      return !!session
    }

    userLoggedIn().then(setLoggedIn)
  }, [user, supabase])

  // if supabase and we're not logged in, then we need to login
  if (supabase && loggedIn === false) return <AuthRequired />

  // if !supabase or !user, then we're still loading
  if (!supabase || !user) return <Loader />

  const {
    children,
  } = props

  return children as JSX.Element
}
