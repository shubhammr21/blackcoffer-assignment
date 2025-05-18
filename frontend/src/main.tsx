import { RouterProvider, createRouter } from "@tanstack/react-router"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"

// Import the generated route tree
import { routeTree } from "./routeTree.gen"

import { getQueryClient } from "@/components/providers/query-client"
import type { QueryClient } from "@tanstack/react-query"
import NotFound from "./components/not-found"
import Providers from "./components/providers"
import reportWebVitals from "./reportWebVitals"
import "./styles.css"

export interface RouterContext {
  queryClient: QueryClient
}

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient: getQueryClient()
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  defaultNotFoundComponent: NotFound
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById("app")
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </StrictMode>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
