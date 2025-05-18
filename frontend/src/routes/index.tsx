import DataDashboard from "@/components/charts/page"
import {
  getFetchDashboardStatsQuery,
  getFetchFacetsQuery
} from "@/services/reports/queries"
import type { RecordFilterParams } from "@/services/reports/types"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: DataDashboard,
  validateSearch: search => search as RecordFilterParams,
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) => {
    context.queryClient.ensureQueryData(getFetchDashboardStatsQuery(deps))
    context.queryClient.ensureQueryData(getFetchFacetsQuery())
  }
})
