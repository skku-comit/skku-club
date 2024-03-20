import { z } from 'zod'

import { CampusSchema } from './prisma'

const NoticeTitleSchema = z.string().min(1).max(100)

const NoticeContentSchema = z.string().min(1)

export const NewNoticeSchema = z.object({
  title: NoticeTitleSchema,
  publishedAt: z.date(),
  content: NoticeContentSchema
})

const ClubTitleSchema = z.string().min(1).max(100)

const ClubDescriptionSchema = z.string().min(1)

export const NewClubSchema = z.object({
  name: ClubTitleSchema,
  description: ClubDescriptionSchema,
  campus: CampusSchema,
  category: z.string()
})

export const UpdateClubSchema = z.object({
  description: ClubDescriptionSchema
})
