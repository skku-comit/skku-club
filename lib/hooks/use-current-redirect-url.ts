'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useCurrentRedirectUrl = () => {
  const pathname = usePathname()
  const search = useSearchParams()

  return useCallback(
    () =>
      encodeURIComponent(`${pathname}${search.size !== 0 ? '?' : ''}${search}`),
    [pathname, search]
  )
}
