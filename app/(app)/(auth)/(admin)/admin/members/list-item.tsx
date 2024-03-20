'use client'

import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api/trpc/client'

export type MemberListItemProps = {
  id: bigint
  name: string | null
  email: string
}

export function MemberListItem({ id, name, email }: MemberListItemProps) {
  const makeAdmin = apiClient.siteMembers.changeRole.useMutation()

  return (
    <div className="flex flex-col">
      <p>이름: {name}</p>
      <p>이메일: {email}</p>
      <Button
        onClick={async () => {
          // TODO: Dialog 이용해서 확인

          await makeAdmin.mutateAsync({
            email,
            admin: false
          })
        }}
      >
        관리자 해제
      </Button>
    </div>
  )
}
