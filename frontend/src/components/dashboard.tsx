import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DataTable from "./data-table"
import FilterPanel from "./filter-panel"

import { Skeleton } from "@/components/ui/skeleton"
import { useFilters } from "@/hooks/use-filters"
import { getFetchDashboardStatsQuery } from "@/services/reports/queries"
import { useSuspenseQuery } from "@tanstack/react-query"
import ChartsView from "./charts-view"
import KeyMetricsView from "./key-metrics-view"

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
      <Tabs defaultValue="charts">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="table">Data Table</TabsTrigger>
        </TabsList>

        <TabsContent value="charts">
          <ChartsView data={data} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Data Records</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <DataTable />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DataDashboard
