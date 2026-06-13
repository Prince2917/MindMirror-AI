'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { moodHistory } from '@/lib/data'

// Burnout risk trend (derived from stress + low sleep)
const burnoutTrend = moodHistory.map((d) => ({
  label: d.label,
  date: d.date,
  risk: Math.round(Math.min(100, d.stress * 7 + (8 - d.sleep) * 6 + d.workload * 3)),
}))

const weeklyReport = [
  { metric: 'Avg Mood', value: '6.1', delta: +8, up: true },
  { metric: 'Avg Stress', value: '5.6', delta: -6, up: true },
  { metric: 'Avg Energy', value: '6.0', delta: +5, up: true },
  { metric: 'Avg Sleep', value: '6.7h', delta: -3, up: false },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics"
        description="Your weekly reports, emotional trends and burnout risk — all in one place."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {weeklyReport.map((r) => (
          <Card key={r.metric} className="glass">
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">{r.metric}</div>
              <div className="mt-1 flex items-end justify-between">
                <span className="text-2xl font-semibold">{r.value}</span>
                <Badge variant="secondary" className={r.up ? 'text-chart-3' : 'text-chart-4'}>
                  {r.delta > 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                  {Math.abs(r.delta)}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base">Emotional Trends</CardTitle>
            <CardDescription>Mood, stress and energy over the last 2 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                mood: { label: 'Mood', color: 'var(--chart-1)' },
                stress: { label: 'Stress', color: 'var(--chart-5)' },
                energy: { label: 'Energy', color: 'var(--chart-3)' },
              }}
              className="h-64 w-full"
            >
              <LineChart data={moodHistory} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
                <YAxis domain={[0, 10]} tickLine={false} axisLine={false} width={28} fontSize={11} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line dataKey="mood" type="monotone" stroke="var(--color-mood)" strokeWidth={2} dot={false} />
                <Line dataKey="stress" type="monotone" stroke="var(--color-stress)" strokeWidth={2} dot={false} />
                <Line dataKey="energy" type="monotone" stroke="var(--color-energy)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base">Burnout Risk Trend</CardTitle>
            <CardDescription>Derived from stress, sleep and workload</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ risk: { label: 'Burnout Risk', color: 'var(--chart-5)' } }}
              className="h-64 w-full"
            >
              <AreaChart data={burnoutTrend} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="fill-risk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-5)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--chart-5)" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
                <YAxis domain={[0, 100]} tickLine={false} axisLine={false} width={28} fontSize={11} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area dataKey="risk" type="monotone" stroke="var(--chart-5)" strokeWidth={2} fill="url(#fill-risk)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-base">Sleep vs Workload</CardTitle>
          <CardDescription>How your inputs interact across the fortnight</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              sleep: { label: 'Sleep (hrs)', color: 'var(--chart-2)' },
              workload: { label: 'Workload', color: 'var(--chart-4)' },
            }}
            className="h-64 w-full"
          >
            <BarChart data={moodHistory} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} width={28} fontSize={11} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="sleep" fill="var(--color-sleep)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="workload" fill="var(--color-workload)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
