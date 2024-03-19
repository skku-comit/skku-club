import { z } from 'zod'

import { NoticePostSchema } from '@/lib/prisma'

import { protectedProcedure, publicProcedure, router } from '../trpc/init'

export const notices = router({
  create: protectedProcedure
    .input(z.object({}))
    .output(NoticePostSchema.pick({ id: true }))
    .mutation(async ({ input, ctx }) => {
      throw new Error('Not implemented')
    }),

  list: publicProcedure
    .input(z.object({ offset: z.number() }))
    .output(z.array(NoticePostSchema.pick({ id: true })))
    .query(async ({ input, ctx }) => {
      throw new Error('Not implemented')
    }),

  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .output(NoticePostSchema)
    .query(async ({ input, ctx }) => {
      throw new Error('Not implemented')
    })
})
