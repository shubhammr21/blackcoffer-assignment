import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type ChartCardProps = {
  title: string
  height: string
  span?: number
  children: React.ReactNode
}

export function ChartCard({ title, height, span, children }: ChartCardProps) {
  return (
    <Card className={span ? `lg:col-span-${span}` : ""}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className={`h-[${height}]`}>{children}</CardContent>
    </Card>
  )
}

export function ChartCardSkeleton({ height }: { height: string }) {
  return (
    <ChartCard title="Loading" height={height}>
      <Skeleton className="w-full h-full" />
    </ChartCard>
  )
}
