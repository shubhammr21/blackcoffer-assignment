import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type ChartCardProps = {
  className?: string | undefined
  title: string
  children: React.ReactNode
}

export function ChartCard({ title, children, className }: ChartCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">{children}</CardContent>
    </Card>
  )
}

export function ChartCardSkeleton() {
  return (
    <ChartCard title="Loading">
      <Skeleton className="w-full h-full" />
    </ChartCard>
  )
}
