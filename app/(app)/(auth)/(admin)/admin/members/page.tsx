'use client'

import { useSearchParams } from 'next/navigation'

import { AddAdminButton } from './add-admin-button'

export default function SiteMembersPage() {
  const searchParams = useSearchParams()

  return (
    <div className="flex flex-col gap-y-4">
      <div></div>

      <div>
        <AddAdminButton />
      </div>
      <div></div>
    </div>
  )
}
