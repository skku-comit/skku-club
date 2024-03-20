import { z } from 'zod'

import { NewClubSchema } from '@/lib/schemas'

import { protectedProcedure, router } from '../trpc/init'

export const clubs = router({
  create: protectedProcedure
    .input(NewClubSchema)
    .output(
      z.object({
        id: z.number()
      })
    )
    .mutation(async ({ input, ctx }) => {
      throw new Error('Not implemented')
    })
})
