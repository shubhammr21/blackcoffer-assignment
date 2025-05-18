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
      <ChartCard title="Intensity by Region" height="300px">
        <RegionChart chartData={data.regions} />
      </ChartCard>

      <ChartCard title="Likelihood Distribution" height="300px">
        <LikelihoodChart chartData={data.likelihoods} />
      </ChartCard>

      <ChartCard title="Topics Distribution" height="300px">
        <TopicChart chartData={data.topics} />
      </ChartCard>

      <ChartCard title="Yearly Trends" height="300px">
        <YearlyTrendChart yearlyData={data.yearly_trends} />
      </ChartCard>

      <ChartCard title="Intensity Analysis" height="400px" span={2}>
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
          <ChartCardSkeleton key={i} height="300px" />
        ))}
      <ChartCardSkeleton height="400px" />
    </div>
  )
}
