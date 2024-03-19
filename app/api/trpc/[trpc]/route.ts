import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { NextResponse } from 'next/server'

import { createContext } from '@/lib/api/trpc/context'
import { apiRouter } from '@/lib/api/trpc/router'

const trpcApiRouteHandler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: apiRouter,
    createContext
  })

export {
  trpcApiRouteHandler as DELETE,
  trpcApiRouteHandler as GET,
  trpcApiRouteHandler as HEAD,
  trpcApiRouteHandler as PATCH,
  trpcApiRouteHandler as POST,
  trpcApiRouteHandler as PUT
}

export function OPTIONS() {
  return NextResponse.json({ status: 'ok' })
}
