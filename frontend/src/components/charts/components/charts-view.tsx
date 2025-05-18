import type { DashboardStatsResponse } from "@/services/reports/types"
import { ChartCard, ChartCardSkeleton } from "./chart-card"
import IntensityChart from "./intensity-chart"
import LikelihoodChart from "./likelihood-chart"
import RegionChart from "./region-chart"
import TopicChart from "./topic-chart"
import YearlyTrendChart from "./yearly-trend-chart"

type ChartsViewProps = { data: DashboardStatsResponse }

export default function ChartsView({ data }: ChartsViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard title="Intensity by Region">
        <RegionChart chartData={data.regions} />
      </ChartCard>

      <ChartCard title="Likelihood Distribution">
        <LikelihoodChart chartData={data.likelihoods} />
      </ChartCard>

      <ChartCard title="Topics Distribution">
        <TopicChart chartData={data.topics} />
      </ChartCard>

      <ChartCard title="Yearly Trends">
        <YearlyTrendChart yearlyData={data.yearly_trends} />
      </ChartCard>

      <ChartCard className="lg:col-span-2" title="Intensity Analysis">
        <IntensityChart chartData={data.sectors} />
      </ChartCard>
    </div>
  )
}

export function ChartsViewSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <ChartCardSkeleton key={i} />
        ))}
      <ChartCardSkeleton />
    </div>
  )
}
