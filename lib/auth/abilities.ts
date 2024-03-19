import { TRPCError } from '@trpc/server'

import { SessionUser } from '@/lib/auth/get-current-user'
import { ClubMembership } from '@/lib/prisma'
import { ClubMemberRoleSchema } from '@/lib/prisma'

import { Abilities, UserRoleSchema } from '../api/trpc/init'

export function defineAbilitiesFor({
  user,
  clubMemberships
}: {
  user: SessionUser | null
  clubMemberships: ClubMembership[] | null
}): Abilities {
  const isAdmin = user?.role === UserRoleSchema.Values.ADMIN

  // == here is intentional
  const getClubRole = async (clubId: bigint) =>
    clubMemberships?.find((m) => m.clubId == clubId)?.role ?? null

  const isClubOwner = async (clubId: bigint) =>
    isAdmin || (await getClubRole(clubId)) === ClubMemberRoleSchema.Values.OWNER

  const isClubMember = async (clubId: bigint) =>
    (await isClubOwner(clubId)) ||
    (await getClubRole(clubId)) === ClubMemberRoleSchema.Values.MEMBER

  const requireClubMember = async (clubId: bigint) => {
    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      })
    }

    if (await isClubMember(clubId)) {
      return
    }

    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Club not found'
    })
  }

  const requireClubOwner = async (clubId: bigint) => {
    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      })
    }

    if (await isClubOwner(clubId)) {
      return
    }
    if (await isClubMember(clubId)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Permission denied'
      })
    }

    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Club not found'
    })
  }

  return {
    isAdmin,
    isClubMember,
    isClubOwner,
    requireClubMember,
    requireClubOwner
  }
}
