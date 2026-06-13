'use client'

import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis, ReferenceLine } from 'recharts'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { AlertTriangle, Target, Activity, TrendingDown } from 'lucide-react'
import { forecast, triggers, patterns } from '@/lib/data'
import { cn } from '@/lib/utils'

const impactColor: Record<string, string> = {
  high: 'text-chart-5',
  medium: 'text-chart-4',
  low: 'text-chart-3',
}

export default function InsightsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Predictive Insights"
        description="MindMirror forecasts your emotional state and flags the patterns driving it."
      />

      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-base">7-Day Emotional Forecast</CardTitle>
          <CardDescription>Predicted mood with confidence band. Watch the midweek dip.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              predicted: { label: 'Predicted', color: 'var(--chart-1)' },
              upper: { label: 'Upper', color: 'var(--chart-2)' },
            }}
            className="h-72 w-full"
          >
            <AreaChart data={forecast} margin={{ left: -20, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
              <YAxis domain={[0, 10]} tickLine={false} axisLine={false} width={28} fontSize={11} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ReferenceLine y={5} stroke="var(--chart-5)" strokeDasharray="4 4" />
              <Area dataKey="upper" type="monotone" stroke="none" fill="url(#band)" />
              <Area dataKey="lower" type="monotone" stroke="none" fill="var(--background)" fillOpacity={1} />
              <Line dataKey="predicted" type="monotone" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ r: 3 }} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="size-4 text-chart-4" /> Risk Indicators
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <RiskRow icon={TrendingDown} label="Midweek mood dip" value="Wed–Thu" tone="text-chart-5" />
            <RiskRow icon={Activity} label="Burnout risk trend" value="Rising" tone="text-chart-4" />
            <RiskRow icon={Target} label="Sleep debt" value="2.5 hrs" tone="text-chart-4" />
          </CardContent>
        </Card>

        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Trigger Detection</CardTitle>
            <CardDescription>Recurring factors most linked to your low days.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {triggers.map((t) => (
              <div key={t.label} className="flex items-center justify-between rounded-xl bg-secondary/40 px-4 py-3">
                <div>
                  <div className="text-sm font-medium">{t.label}</div>
                  <div className="text-xs text-muted-foreground">Detected {t.detected}x this fortnight</div>
                </div>
                <Badge variant="secondary" className={cn('capitalize', impactColor[t.impact])}>
                  {t.impact}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-base">Pattern Analysis</CardTitle>
          <CardDescription>What your data reveals about your emotional rhythms.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {patterns.map((p, i) => (
            <div key={i} className="flex gap-3 rounded-xl bg-secondary/40 px-4 py-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">{p}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function RiskRow({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType
  label: string
  value: string
  tone: string
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-secondary/40 px-4 py-3">
      <span className="flex items-center gap-2 text-sm">
        <Icon className={cn('size-4', tone)} />
        {label}
      </span>
      <span className={cn('text-sm font-semibold', tone)}>{value}</span>
    </div>
  )
}
