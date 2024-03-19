import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { db, NoticePostSchema } from '@/lib/prisma'
import { NewNoticeSchema } from '@/lib/schemas'

import { protectedProcedure, publicProcedure, router } from '../trpc/init'

export const notices = router({
  create: protectedProcedure
    .input(NewNoticeSchema)
    .output(NoticePostSchema.pick({ id: true }))
    .mutation(
      async ({ input: { title, content, publishedAt }, ctx: { user } }) => {
        if (user.role !== 'ADMIN') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You are not allowed to create a notice'
          })
        }

        const notice = await db.noticePost.create({
          data: {
            title,
            content,
            publishedAt,
            author: {
              connect: {
                id: user.id
              }
            }
          },
          select: {
            id: true
          }
        })

        return notice
      }
    ),

  list: publicProcedure
    .input(z.object({ offset: z.number() }))
    .output(
      z.array(
        NoticePostSchema.pick({ id: true, title: true, publishedAt: true })
      )
    )
    .query(async ({ input: { offset }, ctx }) => {
      const notices = await db.noticePost.findMany({
        skip: offset,
        take: 10,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true,
          title: true,
          publishedAt: true
        }
      })

      return notices
    }),

  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .output(NoticePostSchema.pick({ id: true, title: true, content: true }))
    .query(async ({ input: { id }, ctx: { user } }) => {
      const notice = await db.noticePost.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          content: true
        }
      })

      if (!notice) {
        console.error(`User ${user?.id} tried to non-existent notice ${id}`)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Notice not found'
        })
      }

      return notice
    })
})
