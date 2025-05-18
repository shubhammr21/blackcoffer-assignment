import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider
} from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
})

export function getQueryClient() {
  return queryClient
}

export function QueryClientProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  )
}
