import type { DashboardStatsResponse } from "@/services/reports/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export default function KeyMetricsView({
  data,
  isLoading
}: {
  data: DashboardStatsResponse
  isLoading: Boolean
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Records</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-10 w-20" />
          ) : (
            <p className="text-2xl font-bold">{data.total_records}</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg. Intensity</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-10 w-20" />
          ) : (
            <p className="text-2xl font-bold">
              {data.avg_intensity.toFixed(2)}
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg. Likelihood</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-10 w-20" />
          ) : (
            <p className="text-2xl font-bold">
              {data.avg_likelihood.toFixed(2)}
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg. Relevance</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-10 w-20" />
          ) : (
            <p className="text-2xl font-bold">
              {data.avg_relevance.toFixed(2)}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
