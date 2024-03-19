import { z } from 'zod'

export const NoticeTitleSchema = z.string().min(1).max(100)

export const NoticeContentSchema = z.string().min(1)

export const NewNoticeSchema = z.object({
  title: NoticeTitleSchema,
  publishedAt: z.string(),
  content: NoticeContentSchema
})
