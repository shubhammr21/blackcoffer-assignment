import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import DataTable from "./data-table"
import FilterPanel from "./filter-panel"

import { Skeleton } from "@/components/ui/skeleton"
import {
  getFetchDashboardStatsQuery,
  getFetchDashboardTableQuery
} from "@/services/reports/queries"
import { useSuspenseQuery } from "@tanstack/react-query"
import ChartsView from "./charts-view"
import KeyMetricsView from "./key-metrics-view"

// Define data record interface to match Django model
export interface DataRecord {
  id: number
  end_year: number | null
  intensity: number | null
  sector: string | null
  topic: string | null
  insight: string | null
  url: string | null
  region: string | null
  start_year: number | null
  impact: string | null
  added: string | null
  published: string | null
  country: string | null
  relevance: number | null
  pestle: string | null
  source: string | null
  title: string | null
  likelihood: number | null
}

// Interface for filters
export interface Filters {
  end_year: string
  topic: string
  sector: string
  region: string
  pestle: string
  source: string
  country: string
}

const DataDashboard = () => {
  const [filters, setFilters] = useState<Filters>({
    end_year: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    country: ""
  })

  const { data: tableData, isLoading } = useSuspenseQuery(
    getFetchDashboardTableQuery()
  )
  const { data: statsData, isLoading: statsIsLoading } = useSuspenseQuery(
    getFetchDashboardStatsQuery()
  )

  // Handle filter changes
  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  return (
    <div className="space-y-6">
      {/* Filter panel */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        </CardContent>
      </Card>

      {/* Key metrics */}
      <KeyMetricsView data={statsData} isLoading={statsIsLoading} />

      {/* Visualizations */}
      <Tabs defaultValue="charts">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="table">Data Table</TabsTrigger>
        </TabsList>

        <TabsContent value="charts">
          <ChartsView data={statsData} isLoading={statsIsLoading} />
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
                <DataTable data={tableData.results} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DataDashboard
