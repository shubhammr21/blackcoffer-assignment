import type { DataRecord } from "./dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export default function KeyMetricsView({
  filteredData,
  isLoading
}: {
  filteredData: DataRecord[]
  isLoading: Boolean
}) {
  return (
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
          <CardTitle className="text-sm font-medium">Avg. Intensity</CardTitle>
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
          <CardTitle className="text-sm font-medium">Avg. Likelihood</CardTitle>
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
  )
}
