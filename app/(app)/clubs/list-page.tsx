import { Card } from '@/components/ui/card'
import { ApiOutput } from '@/lib/api/trpc/router'

export interface ClubListPageProps {
  clubs: ApiOutput['clubs']['listAll']
}

export function ClubListPage({ clubs }: ClubListPageProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {clubs.map((club) => {
        return <Card key={club.id.toString()}></Card>
      })}
    </div>
  )
}
