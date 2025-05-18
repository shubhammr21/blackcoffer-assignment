import type { DashboardStatsResponse } from "@/services/reports/types"
import { MetricCard, MetricCardSkeleton } from "./metric-card"

type KeyMetricsViewProps = { data: DashboardStatsResponse }

const formatDecimal = (value: number | null) => (value ?? 0).toFixed(2)

export default function KeyMetricsView({ data }: KeyMetricsViewProps) {
  const metrics = [
    { title: "Total Records", value: data.total_records },
    { title: "Avg. Intensity", value: formatDecimal(data.avg_intensity) },
    { title: "Avg. Likelihood", value: formatDecimal(data.avg_likelihood) },
    { title: "Avg. Relevance", value: formatDecimal(data.avg_relevance) }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {metrics.map(metric => (
        <MetricCard key={metric.title} title={metric.title}>
          <p className="text-2xl font-bold">{metric.value}</p>
        </MetricCard>
      ))}
    </div>
  )
}

export function KeyMetricsViewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
    </div>
  )
}
