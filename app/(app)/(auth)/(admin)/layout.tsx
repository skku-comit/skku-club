import { PropsWithChildren } from 'react'

import { getCurrentUser } from '@/lib/auth/get-current-user'

export default async function AdminLayout({ children }: PropsWithChildren) {
  const user = await getCurrentUser()

  if (user?.role !== 'ADMIN') {
    return <div>이 페이지는 관리자만 접근할 수 있습니다</div>
  }

  return <>{children}</>
}
