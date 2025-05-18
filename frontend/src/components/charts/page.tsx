import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useFilters } from "@/hooks/use-filters"
import { getFetchDashboardStatsQuery } from "@/services/reports/queries"
import { useSuspenseQuery } from "@tanstack/react-query"
import ChartsView from "./components/charts-view"
import FilterPanel from "./components/filter-panel"
import KeyMetricsView from "./components/key-metrics-view"

const DataDashboard = () => {
  const { filters, setFilters } = useFilters("/")

  const { data, isLoading } = useSuspenseQuery(
    getFetchDashboardStatsQuery(filters)
  )

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
      <KeyMetricsView data={data} isLoading={isLoading} />

      {/* Visualizations */}
      <ChartsView data={data} isLoading={isLoading} />
    </div>
  )
}

export default DataDashboard
