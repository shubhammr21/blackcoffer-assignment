import type { DashboardStatsResponse } from "@/services/reports/types"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Skeleton } from "../../ui/skeleton"
import IntensityChart from "./intensity-chart"
import LikelihoodChart from "./likelihood-chart"
import RegionChart from "./region-chart"
import TopicChart from "./topic-chart"
import YearlyTrendChart from "./yearly-trend-chart"

export default function ChartsView({
  data,
  isLoading
}: {
  data: DashboardStatsResponse
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
            <RegionChart chartData={data.regions} />
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
            <LikelihoodChart chartData={data.likelihoods} />
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
            <TopicChart chartData={data.topics} />
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
            <YearlyTrendChart yearlyData={data.yearly_trends} />
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
            <IntensityChart chartData={data.sectors} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
