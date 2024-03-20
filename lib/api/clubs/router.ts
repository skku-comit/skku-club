import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { ClubSchema, db } from '@/lib/prisma'
import { NewClubSchema } from '@/lib/schemas'

import { protectedProcedure, publicProcedure, router } from '../trpc/init'

export const clubs = router({
  create: protectedProcedure
    .input(NewClubSchema)
    .output(ClubSchema.pick({ id: true }))
    .mutation(
      async ({
        input: { name, description, category, campus },
        ctx: { user }
      }) => {
        if (user.role !== 'ADMIN') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: '관리자만 동아리를 추가할 수 있습니다.'
          })
        }

        const club = await db.club.create({
          data: {
            name,
            description,
            category,
            campus,
            creator: {
              connect: {
                id: user.id
              }
            }
          },

          select: {
            id: true
          }
        })

        return club
      }
    ),

  list: publicProcedure
    .input(
      z.object({
        offset: z.number().optional()
      })
    )
    .output(
      z.array(
        ClubSchema.pick({
          id: true,
          name: true,
          description: true,
          category: true,
          campus: true
        })
      )
    )
    .query(async ({ input: { offset } }) => {
      const clubs = await db.club.findMany({
        skip: offset,
        take: 10,
        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          campus: true
        }
      })

      return clubs
    })
})
