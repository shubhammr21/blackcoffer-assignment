import DataDashboard from "@/components/dashboard"
import type { RecordFilterParams } from "@/services/reports/types"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: DataDashboard,
  validateSearch: () => ({}) as RecordFilterParams
})
