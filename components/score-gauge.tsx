'use client'

import { RadialBar, RadialBarChart, PolarAngleAxis } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'

export function ScoreGauge({
  value,
  color = 'var(--chart-1)',
  label,
  suffix = '',
}: {
  value: number
  color?: string
  label: string
  suffix?: string
}) {
  return (
    <div className="relative flex flex-col items-center">
      <ChartContainer config={{ score: { label } }} className="h-40 w-40">
        <RadialBarChart
          data={[{ name: label, value, fill: color }]}
          startAngle={90}
          endAngle={-270}
          innerRadius="72%"
          outerRadius="100%"
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={20} background={{ fill: 'var(--secondary)' }} />
        </RadialBarChart>
      </ChartContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold tabular-nums">{value}{suffix}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    </div>
  )
}
