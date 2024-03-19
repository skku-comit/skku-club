import 'server-only'

import { createContext } from './context'
import { createCallerFactory } from './init'
import { apiRouter } from './router'

const callerFactory = createCallerFactory(apiRouter)

export const createApiCaller = async () =>
  callerFactory(await createContext({ isAdmin: false }))
