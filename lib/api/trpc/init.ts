import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { z } from 'zod'

export const UserRoleSchema = z.enum(['USER', 'ADMIN'])

export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`

export const UserSchema = z.object({
  role: UserRoleSchema,
  id: z.bigint(),
  email: z.string(),
  emailVerified: z.boolean(),
  name: z.string().nullable(),
  avatarUrl: z.string().nullable()
})

export type User = z.infer<typeof UserSchema>

export type Abilities = {
  isAdmin: boolean
  isClubMember: (clubId: bigint) => Promise<boolean>
  isClubOwner: (clubId: bigint) => Promise<boolean>
  requireClubMember: (clubId: bigint) => Promise<void>
  requireClubOwner: (clubId: bigint) => Promise<void>
}

export type Context = {
  user: User | null
  abilities: Abilities
  responseHeaders: Headers | null
  isAdmin: boolean
}

const t = initTRPC.context<Context>().create({
  transformer: superjson
})

/**
 * Create a router
 * @see https://trpc.io/docs/router
 */
export const router = t.router

export const createCallerFactory = t.createCallerFactory

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/procedures
 **/
export const publicProcedure = t.procedure

export const middleware = t.middleware

const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' })
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  })
})

export const protectedProcedure = publicProcedure.use(isAuthenticated)
