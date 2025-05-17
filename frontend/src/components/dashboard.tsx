import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import DataTable from "./data-table"
import FilterPanel from "./filter-panel"

import { Skeleton } from "@/components/ui/skeleton"
import mockData from "../data/mockData"
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
  endYear: string
  topic: string
  sector: string
  region: string
  pestle: string
  source: string
  country: string
}

const DataDashboard = () => {
  const [data, setData] = useState<DataRecord[]>([])
  const [filteredData, setFilteredData] = useState<DataRecord[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [filters, setFilters] = useState<Filters>({
    endYear: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    country: ""
  })

  // Function to fetch data from API
  const fetchData = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    try {
      // In a real implementation, this would be an API call:
      // const response = await axios.get('/api/records/');
      // const fetchedData = response.data;

      // For now, we'll use mock data
      const fetchedData = mockData
      setData(fetchedData)
      setFilteredData(fetchedData)

      toast("Data loaded successfully", {
        description: `Loaded ${fetchedData.length} records`
      })
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.warning("Error loading data", {
        description: "Please try again later"
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Apply filters when filters state changes
  useEffect(() => {
    if (data.length === 0) return

    let result = [...data]

    if (filters.endYear) {
      result = result.filter(
        item => item.end_year?.toString() === filters.endYear
      )
    }

    if (filters.topic) {
      result = result.filter(item => item.topic === filters.topic)
    }

    if (filters.sector) {
      result = result.filter(item => item.sector === filters.sector)
    }

    if (filters.region) {
      result = result.filter(item => item.region === filters.region)
    }

    if (filters.pestle) {
      result = result.filter(item => item.pestle === filters.pestle)
    }

    if (filters.source) {
      result = result.filter(item => item.source === filters.source)
    }

    if (filters.country) {
      result = result.filter(item => item.country === filters.country)
    }

    setFilteredData(result)
  }, [filters, data])

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
      <KeyMetricsView filteredData={filteredData} isLoading={isLoading} />

      {/* Visualizations */}
      <Tabs defaultValue="charts">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="table">Data Table</TabsTrigger>
        </TabsList>

        <TabsContent value="charts">
          <ChartsView filteredData={filteredData} isLoading={isLoading} />
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
                <DataTable data={filteredData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DataDashboard
