'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { PropsWithChildren, useMemo, useState } from 'react'
import SuperJSON from 'superjson'

import { apiClient } from '@/lib/api/trpc/client'

export function TrpcProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryKeyHashFn: (query) => {
              return SuperJSON.stringify(query)
            }
          }
        }
      })
  )
  const trpcClient = useMemo(
    () =>
      apiClient.createClient({
        links: [
          httpBatchLink({
            url: '/api/trpc'
          })
        ],
        transformer: SuperJSON
      }),
    []
  )

  return (
    <apiClient.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </apiClient.Provider>
  )
}
