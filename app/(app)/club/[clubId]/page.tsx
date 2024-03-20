import * as sanitizeHtml from 'sanitize-html'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { createApiCaller } from '@/lib/api/trpc/server'
import { formatCampus, formatCategory } from '@/lib/format'

export default async function ClubPage({
  params: { clubId }
}: {
  params: { clubId: string }
}) {
  const apiCaller = await createApiCaller()
  const club = await apiCaller.clubs.get({ id: BigInt(clubId) })

  if (!club) {
    return <div>동아리를 찾을 수 없습니다.</div>
  }

  const description = sanitizeHtml.default(club.description, {})

  return (
    <div className="flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle>{club.name}</CardTitle>
          <CardDescription>
            {formatCategory(club.category)} - {formatCampus(club.campus)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </CardContent>
      </Card>
    </div>
  )
}
