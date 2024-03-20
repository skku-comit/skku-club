import { CampusType } from '@/lib/prisma'

export function formatCategory(category: string) {
  switch (category) {
    case 'central':
      return '중앙동아리'
    default:
      return `TODO: ${category}`
  }
}

export function formatCampus(campus: CampusType) {
  switch (campus) {
    case 'SEOUL':
      return '명륜'
    case 'SUWON':
      return '율전'
    case 'BOTH':
      return '공통'
  }
}
