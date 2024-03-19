import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { clubs } from '../clubs/router'
import { notices } from '../notices/router'
import { router } from './init'

export const apiRouter = router({
  notices,
  clubs
})

export type ApiRouter = typeof apiRouter
export type ApiInput = inferRouterInputs<ApiRouter>
export type ApiOutput = inferRouterOutputs<ApiRouter>
