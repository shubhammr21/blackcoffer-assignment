import React from "react"

import { QueryClientProvider } from "./query-client"

import { Toaster } from "@/components/ui/sonner"

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider>
      <Toaster />
      {children}
    </QueryClientProvider>
  )
}
