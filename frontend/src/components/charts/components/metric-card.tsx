import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type MetricCardProps = {
  title: string
  children: React.ReactNode
}

export function MetricCard({ title, children }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export function MetricCardSkeleton() {
  return (
    <MetricCard title="Loading">
      <Skeleton className="h-10 w-20" />
    </MetricCard>
  )
}
