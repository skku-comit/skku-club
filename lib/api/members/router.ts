import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { db } from '@/lib/prisma'

import { protectedProcedure, router } from '../trpc/init'

export const members = router({
  listAdmins: protectedProcedure
    .input(
      z.object({
        page: z.number().optional()
      })
    )
    .output(
      z.array(
        z.object({ userId: z.bigint(), name: z.string(), email: z.string() })
      )
    )
    .query(async ({ input: { page }, ctx }) => {
      if (ctx.user.role !== 'ADMIN') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: '관리자만 사용할 수 있습니다.'
        })
      }

      page = page ?? 1
      if (page < 1) {
        page = 1
      }

      const users = await db.user.findMany({
        where: {
          role: 'ADMIN'
        },
        skip: (page - 1) * 10,
        take: 10,
        select: {
          id: true,
          name: true,
          email: true
        }
      })

      return users
    }),

  changeRole: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        admin: z.boolean()
      })
    )
    .output(z.void())
    .query(async ({ input: { email, admin }, ctx }) => {
      if (ctx.user.role !== 'ADMIN') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: '관리자만 사용할 수 있습니다.'
        })
      }

      await db.user.update({
        where: {
          email
        },
        data: {
          role: admin ? 'ADMIN' : 'USER'
        }
      })
    })
})
