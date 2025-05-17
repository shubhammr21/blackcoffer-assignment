import DataDashboard from "@/components/DataDashboard"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: DataDashboard
})
