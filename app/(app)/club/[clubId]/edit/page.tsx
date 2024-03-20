'use client'

import { z } from 'zod'

import { apiClient } from '@/lib/api/trpc/client'
import { NewClubSchema } from '@/lib/schemas'

import ClubEditForm from './form'

type Inputs = z.infer<typeof NewClubSchema>

export default function ClubEditPage({
  params: { clubId }
}: {
  params: { clubId: string }
}) {
  const club = apiClient.clubs.get.useQuery({ id: BigInt(clubId) })

  return <div>{club.data && <ClubEditForm club={club.data} />}</div>
}
