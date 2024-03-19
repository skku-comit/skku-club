import 'server-only'

import { createCallerFactory } from './init'
import { apiRouter } from './router'

export const createApiCaller = createCallerFactory(apiRouter)
