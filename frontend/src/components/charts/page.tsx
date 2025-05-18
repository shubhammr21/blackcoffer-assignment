import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useFilters } from "@/hooks/use-filters"
import { getFetchDashboardStatsQuery } from "@/services/reports/queries"
import { useQuery } from "@tanstack/react-query"
import ChartsView, { ChartsViewSkeleton } from "./components/charts-view"
import FilterPanel from "./components/filter-panel"
import KeyMetricsView, {
  KeyMetricsViewSkeleton
} from "./components/key-metrics-view"

const DataDashboard = () => {
  const { filters, setFilters } = useFilters("/")

  const { data, isLoading } = useQuery(getFetchDashboardStatsQuery(filters))

  return (
    <div className="space-y-6">
      {/* Filter panel */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <FilterPanel filters={filters} onFilterChange={setFilters} />
        </CardContent>
      </Card>

      {/* Key metrics */}
      {isLoading || !data ? (
        <KeyMetricsViewSkeleton />
      ) : (
        <KeyMetricsView data={data} />
      )}

      {/* Visualizations */}
      {isLoading || !data ? <ChartsViewSkeleton /> : <ChartsView data={data} />}
    </div>
  )
}

export default DataDashboard
