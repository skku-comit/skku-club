import { createTRPCReact } from '@trpc/react-query'

import { type ApiRouter } from './router'

export const apiClient = createTRPCReact<ApiRouter>({})
