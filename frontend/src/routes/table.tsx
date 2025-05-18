import DataRecordTablePage from "@/components/records/page"
import {
  getFetchDashboardTableQuery,
  getFetchFacetsQuery
} from "@/services/reports/queries"
import type { PaginatedRecordFilterParams } from "@/services/reports/types"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/table")({
  component: DataRecordTablePage,
  validateSearch: () => ({}) as PaginatedRecordFilterParams,
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) => {
    context.queryClient.ensureQueryData(getFetchDashboardTableQuery(deps))
    context.queryClient.ensureQueryData(getFetchFacetsQuery())
  }
})
