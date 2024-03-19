import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

import { defineAbilitiesFor } from '@/lib/auth/abilities'
import { getCurrentUser, SessionUser } from '@/lib/auth/get-current-user'
import { db } from '@/lib/prisma'

import { Context } from './init'

export async function createContext(
  params?: FetchCreateContextFnOptions | { isAdmin?: boolean }
): Promise<Context> {
  const user: SessionUser | null =
    params && 'isAdmin' in params ? null : await getCurrentUser()

  const clubMemberships = user
    ? await db.clubMembership.findMany({
        where: {
          userId: user.id
        },
        include: {
          club: true
        }
      })
    : null

  const abilities = defineAbilitiesFor({
    user,
    clubMemberships
  })

  return {
    user,
    abilities,
    responseHeaders:
      params && 'resHeaders' in params ? params.resHeaders : null,
    isAdmin: !!(params && 'isAdmin' in params ? params.isAdmin : false)
  }
}
