import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { clubRouter } from '../clubs/router'
import { noticeRouter } from '../notices/router'
import { siteMemberRouter } from '../site-members/router'
import { router } from './init'

export const apiRouter = router({
  notices: noticeRouter,
  clubs: clubRouter,
  siteMembers: siteMemberRouter
})

export type ApiRouter = typeof apiRouter
export type ApiInput = inferRouterInputs<ApiRouter>
export type ApiOutput = inferRouterOutputs<ApiRouter>
