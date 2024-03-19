import { PropsWithChildren, Suspense } from 'react'

import { AuthRequired } from '@/components/auth/auth-required'

export default async function NeedAuthLayout({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <AuthRequired>{children}</AuthRequired>
    </Suspense>
  )
}
