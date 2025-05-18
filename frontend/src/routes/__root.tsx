import RootLayout from "@/components/root-layout"
import type { RouterContext } from "@/main"
import { createRootRouteWithContext } from "@tanstack/react-router"

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout
})
