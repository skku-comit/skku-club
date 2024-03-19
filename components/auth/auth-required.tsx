'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

import { useCurrentRedirectUrl } from '@/lib/hooks/use-current-redirect-url'

export function AuthRequired({ children }: PropsWithChildren) {
  const router = useRouter()
  const redirectUrl = useCurrentRedirectUrl()
  const { user, isLoading } = useUser()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/api/auth/login?returnTo=${redirectUrl()}`)
      return
    }
  }, [user, redirectUrl, router, isLoading])

  if (isLoading || !user) return null

  return <>{children}</>
}
