import IntensityChart from "./charts/intensity-chart"
import LikelihoodChart from "./charts/likelihood-chart"
import RegionChart from "./charts/region-chart"
import TopicChart from "./charts/topic-chart"
import YearlyTrendChart from "./charts/yearly-trend-chart"
import type { DataRecord } from "./dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export default function ChartsView({
  filteredData,
  isLoading
}: {
  filteredData: DataRecord[]
  isLoading: Boolean
}) {
  return (
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
  )
}
