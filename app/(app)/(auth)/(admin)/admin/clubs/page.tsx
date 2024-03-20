'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api/trpc/client'

import { ClubListItem } from './list-item'

export default function ClubsPage() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const clubs = apiClient.clubs.list.useQuery({
    offset: (page - 1) * 10
  })

  return (
    <div className="flex flex-col gap-y-4">
      <div></div>
      <div>
        <Link href={`/clubs/new`}>
          <Button>동아리 추가</Button>
        </Link>
      </div>
      <div className="flex flex-row">
        {page > 1 && (
          <Link href={`/admin/clubs?page=${page - 1}`}>
            <Button>이전 페이지</Button>
          </Link>
        )}
        {clubs.data?.length === 10 && (
          <Link href={`/admin/clubs?page=${page + 1}`}>
            <Button>다음 페이지</Button>
          </Link>
        )}
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
