import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { ClubMemberRoleSchema, ClubSchema, db } from '@/lib/prisma'
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

  delete: protectedProcedure
    .input(z.object({ id: z.bigint() }))
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ input: { id }, ctx: { user } }) => {
      if (user.role !== 'ADMIN') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: '관리자만 동아리를 삭제할 수 있습니다.'
        })
      }

      await db.club.delete({
        where: {
          id
        }
      })

      return { success: true }
    }),

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
    }),

  changeRole: protectedProcedure
    .input(
      z.object({
        clubId: z.bigint(),
        email: z.string(),
        role: ClubMemberRoleSchema
      })
    )
    .output(z.object({ success: z.boolean() }))
    .mutation(
      async ({ input: { clubId, email, role }, ctx: { user, abilities } }) => {
        // 사이트 관리자 및 동아리 관리자만 권한을 변경할 수 있습니다.
        await abilities.requireClubOwner(clubId)

        // 이메일로 사용자를 찾습니다.
        const targetUser = await db.user.findUnique({
          where: {
            email
          }
        })

        if (!targetUser) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: '해당 이메일로 사용자를 찾을 수 없습니다.'
          })
        }

        // 동아리 관리자로 변경합니다.
        await db.clubMembership.upsert({
          where: {
            clubId_userId: {
              clubId,
              userId: targetUser.id
            }
          },
          create: {
            clubId,
            userId: targetUser.id,
            role
          },
          update: {
            role
          }
        })

        return { success: true }
      }
    ),

  listAdmins: protectedProcedure
    .input(z.object({ clubId: z.bigint() }))
    .output(
      z.array(
        z.object({
          id: z.bigint(),
          name: z.string().nullable(),
          email: z.string()
        })
      )
    )
    .query(async ({ input: { clubId }, ctx: { user, abilities } }) => {
      // 사이트 관리자 및 동아리 관리자만 관리자 목록을 조회할 수 있습니다.
      await abilities.requireClubOwner(clubId)

      const members = await db.clubMembership.findMany({
        where: {
          clubId
        },
        select: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })

      return members.map((m) => m.user)
    })
})
