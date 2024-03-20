'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api/trpc/client'

import { ClubListItem } from './list-item'

export default function ClubsPage() {
  const searchParams = useSearchParams()
  const clubs = apiClient.clubs.list.useQuery({
    offset: Number(searchParams.get('offset')) || 0
  })

  return (
    <div className="flex flex-col gap-y-4">
      <div></div>
      <div>
        <Link href={`/clubs/new`}>
          <Button>동아리 추가</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-3">
        {clubs.data?.map((club) => (
          <div key={club.id.toString()}>
            <ClubListItem
              club={club}
              onChange={() => {
                clubs.refetch()
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
