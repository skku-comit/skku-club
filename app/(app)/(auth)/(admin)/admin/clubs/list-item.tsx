'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { apiClient } from '@/lib/api/trpc/client'
import { formatCampus, formatCategory } from '@/lib/format'
import { CampusType } from '@/lib/prisma'

import { EditAdminButton } from './edit-admin-button'

export interface ClubListItemProps {
  club: {
    id: bigint
    name: string
    description: string
    category: string
    campus: CampusType
  }

  onChange: () => void
}

export function ClubListItem({ club, onChange }: ClubListItemProps) {
  const deleteClub = apiClient.clubs.delete.useMutation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{club.name}</CardTitle>
        <CardDescription>
          {formatCategory(club.category)} - {formatCampus(club.campus)}
        </CardDescription>
      </CardHeader>
      <CardContent>{club.description}</CardContent>
      <CardFooter className="flex justify-between">
        <EditAdminButton clubId={club.id} />
        <Button
          variant="outline"
          onClick={async () => {
            confirm('정말 삭제하시겠습니까?') &&
              (await deleteClub.mutateAsync({ id: club.id }))

            onChange()
          }}
        >
          삭제
        </Button>
      </CardFooter>
    </Card>
  )
}
