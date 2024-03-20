import { createApiCaller } from '@/lib/api/trpc/server'

import { ClubListPage } from '../../list-page'

export const dynamic = 'force-dynamic'

export default async function SeoulClubsPage() {
  const caller = await createApiCaller()

  const clubs = await caller.clubs.listAll({
    campus: 'SEOUL'
  })

  return <ClubListPage clubs={clubs} />
}
