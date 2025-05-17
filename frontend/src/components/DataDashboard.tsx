import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import IntensityChart from "./charts/IntensityChart"
import LikelihoodChart from "./charts/LikelihoodChart"
import RegionChart from "./charts/RegionChart"
import TopicChart from "./charts/TopicChart"
import YearlyTrendChart from "./charts/YearlyTrendChart"
import DataTable from "./DataTable"
import FilterPanel from "./FilterPanel"

import { Skeleton } from "@/components/ui/skeleton"
import mockData from "../data/mockData"

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

  // Get unique values for filter options
  const getFilterOptions = (field: keyof DataRecord) => {
    if (!data.length) return []

    const uniqueValues = new Set<string>()

    data.forEach(item => {
      const value = item[field]
      if (value && typeof value === "string") {
        uniqueValues.add(value)
      } else if (value && typeof value === "number") {
        uniqueValues.add(value.toString())
      }
    })

    return Array.from(uniqueValues).sort()
  }

  return (
    <div className="space-y-6">
      {/* Filter panel */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            filterOptions={{
              endYears: getFilterOptions("end_year"),
              topics: getFilterOptions("topic"),
              sectors: getFilterOptions("sector"),
              regions: getFilterOptions("region"),
              pestles: getFilterOptions("pestle"),
              sources: getFilterOptions("source"),
              countries: getFilterOptions("country")
            }}
          />
        </CardContent>
      </Card>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-10 w-20" />
            ) : (
              <p className="text-2xl font-bold">{filteredData.length}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Intensity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-10 w-20" />
            ) : (
              <p className="text-2xl font-bold">
                {filteredData.length
                  ? (
                      filteredData.reduce(
                        (sum, item) => sum + (item.intensity || 0),
                        0
                      ) / filteredData.length
                    ).toFixed(1)
                  : "0"}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Likelihood
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-10 w-20" />
            ) : (
              <p className="text-2xl font-bold">
                {filteredData.length
                  ? (
                      filteredData.reduce(
                        (sum, item) => sum + (item.likelihood || 0),
                        0
                      ) / filteredData.length
                    ).toFixed(1)
                  : "0"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Visualizations */}
      <Tabs defaultValue="charts">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="table">Data Table</TabsTrigger>
        </TabsList>

        <TabsContent value="charts">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Intensity by Region</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {isLoading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <RegionChart data={filteredData} />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Likelihood Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {isLoading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <LikelihoodChart data={filteredData} />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Topics Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {isLoading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <TopicChart data={filteredData} />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Yearly Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {isLoading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <YearlyTrendChart data={filteredData} />
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Intensity Analysis</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                {isLoading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <IntensityChart data={filteredData} />
                )}
              </CardContent>
            </Card>
          </div>
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
