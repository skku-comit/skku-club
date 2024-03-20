import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { CampusType } from '@/lib/prisma'

export interface ClubListItemProps {
  club: {
    id: bigint
    name: string
    description: string
    category: string
    campus: CampusType
  }
}

export function ClubListItem({ club }: ClubListItemProps) {
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
        <Button variant="outline">수정 권한 관리</Button>
        <Button variant="outline">삭제</Button>
      </CardFooter>
    </Card>
  )
}

function formatCategory(category: string) {
  switch (category) {
    case 'central':
      return '중앙동아리'
    default:
      return `TODO: ${category}`
  }
}

function formatCampus(campus: CampusType) {
  switch (campus) {
    case 'SEOUL':
      return '명륜'
    case 'SUWON':
      return '율전'
    case 'BOTH':
      return '공통'
  }
}
