import DataRecordTablePage from "@/components/records/page"
import type { PaginatedRecordFilterParams } from "@/services/reports/types"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/table")({
  component: DataRecordTablePage,
  validateSearch: () => ({}) as PaginatedRecordFilterParams
})
