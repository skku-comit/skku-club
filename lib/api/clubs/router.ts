import { z } from 'zod'

import { protectedProcedure, router } from '../trpc/init'

export const clubs = router({
  create: protectedProcedure
    .input(z.object({}))
    .output(z.object({}))
    .mutation(async ({ input, ctx }) => {
      throw new Error('Not implemented')
    })
})
