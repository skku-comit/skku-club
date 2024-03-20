import * as sanitizeHtml from 'sanitize-html'

import { createApiCaller } from '@/lib/api/trpc/server'

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
    <div>
      <h1>{club.name}</h1>
      <div></div>
    </div>
  )
}
