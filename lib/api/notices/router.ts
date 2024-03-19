import { z } from 'zod'

import { NoticePostSchema } from '@/lib/prisma'

import { protectedProcedure, router } from '../trpc/init'

export const notices = router({
  create: protectedProcedure
    .input(z.object({}))
    .output(z.array(NoticePostSchema.pick({ id: true })))
    .mutation(async ({ input, ctx }) => {
      throw new Error('Not implemented')
    })
})
