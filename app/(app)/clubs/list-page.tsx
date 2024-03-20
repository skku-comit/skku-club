import Link from 'next/link'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ApiOutput } from '@/lib/api/trpc/router'
import { formatCampus, formatCategory } from '@/lib/format'

export interface ClubListPageProps {
  clubs: ApiOutput['clubs']['listAll']
}

export function ClubListPage({ clubs }: ClubListPageProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {clubs.map((club) => {
        return (
          <Link key={club.id.toString()} href={`/club/${club.id}`}>
            <Card>
              <CardHeader>
                <CardTitle>{club.name}</CardTitle>
                <CardDescription>
                  {formatCategory(club.category)} - {formatCampus(club.campus)}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
