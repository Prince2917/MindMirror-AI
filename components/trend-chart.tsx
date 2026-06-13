'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { moodHistory } from '@/lib/data'

type Metric = 'mood' | 'stress' | 'energy'

const meta: Record<Metric, { label: string; color: string; desc: string }> = {
  mood: { label: 'Mood', color: 'var(--chart-1)', desc: 'How you\u2019ve felt over the last 2 weeks' },
  stress: { label: 'Stress', color: 'var(--chart-5)', desc: 'Daily stress levels (lower is better)' },
  energy: { label: 'Energy', color: 'var(--chart-3)', desc: 'Daily energy across the last 2 weeks' },
}

export function TrendChart({ metric, compact = false }: { metric: Metric; compact?: boolean }) {
  const m = meta[metric]
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-base">{m.label} Trend</CardTitle>
        {!compact ? <CardDescription>{m.desc}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{ [metric]: { label: m.label, color: m.color } }}
          className={compact ? 'h-40 w-full' : 'h-56 w-full'}
        >
          <AreaChart data={moodHistory} margin={{ left: -20, right: 8, top: 8 }}>
            <defs>
              <linearGradient id={`fill-${metric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={m.color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={m.color} stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
            <YAxis domain={[0, 10]} tickLine={false} axisLine={false} width={28} fontSize={11} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey={metric}
              type="monotone"
              stroke={m.color}
              strokeWidth={2}
              fill={`url(#fill-${metric})`}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
