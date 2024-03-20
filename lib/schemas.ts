import { z } from 'zod'

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
  title: ClubTitleSchema,
  description: ClubDescriptionSchema
})
