'use client'

import { useSearchParams } from 'next/navigation'

import { apiClient } from '@/lib/api/trpc/client'

import { AddAdminButton } from './add-admin-button'
import { MemberListItem } from './list-item'

export default function SiteMembersPage() {
  const searchParams = useSearchParams()
  const members = apiClient.siteMembers.listAdmins.useQuery({
    page: Number(searchParams.get('page')) || 1
  })

  return (
    <div className="flex flex-col gap-y-4">
      <div></div>

      <div>
        <AddAdminButton />
      </div>
      <div className="gap-y-4">
        {members.data?.map((member) => (
          <div key={member.id}>
            <MemberListItem {...member} />
          </div>
        ))}
      </div>
    </div>
  )
}
