import { Toaster } from "@/components/ui/sonner"
import { Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import Header from "../components/Header"

export const Route = createRootRoute({
  component: () => (
    <>
      <Toaster />
      <TanStackRouterDevtools />
      <div className="min-h-screen bg-gray-100">
        <Header />

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </>
  )
})
