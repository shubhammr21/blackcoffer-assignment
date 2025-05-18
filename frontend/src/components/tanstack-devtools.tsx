import { lazy } from "react"

const loadDevtools = () =>
  Promise.all([
    import("@tanstack/react-router-devtools"),
    import("@tanstack/react-query-devtools")
  ]).then(([routerDevtools, reactQueryDevtools]) => {
    return {
      default: () => (
        <>
          <reactQueryDevtools.ReactQueryDevtools buttonPosition="bottom-right" />
          <routerDevtools.TanStackRouterDevtools position="bottom-right" />
        </>
      )
    }
  })

const TanStackDevtools =
  import.meta.env.NODE_ENV === "production" ? () => null : lazy(loadDevtools)

export default TanStackDevtools
