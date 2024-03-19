import 'server-only'

import { getSession } from '@auth0/nextjs-auth0'
import { inferAsyncReturnType } from '@trpc/server'

import { db } from '../prisma'

export type SessionUser = inferAsyncReturnType<typeof getCurrentUser>

export async function getCurrentUser() {
  const session = await getSessionUser()

  if (!session) {
    return null
  }

  const user = await db.user.upsert({
    where: {
      auth0Id: session.auth0Id
    },
    update: {
      email: session.email,
      emailVerified: session.emailVerified
    },
    create: {
      email: session.email,
      emailVerified: session.emailVerified,

      name: session.name,
      auth0Id: session.auth0Id,
      avatarUrl: session.avatarUrl
    },

    select: {
      id: true,
      auth0Id: true,
      name: true,
      email: true,
      emailVerified: true,
      avatarUrl: true,
      role: true
    }
  })

  return user
}

async function getSessionUser() {
  const session = await getSession()

  if (!session) {
    return null
  }

  return {
    email: session.user.email,
    emailVerified: session.user.email_verified,
    name: session.user.name,
    auth0Id: session.user.sub,
    avatarUrl: session.user.picture,
    token: session.accessToken
  }
}
