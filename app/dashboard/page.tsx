import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { TrendChart } from '@/components/trend-chart'
import { ScoreGauge } from '@/components/score-gauge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, TrendingUp, AlertTriangle, HeartPulse } from 'lucide-react'
import {
  emotionalHealthScore,
  burnoutRisk,
  moodTrendDelta,
  weeklySummary,
} from '@/lib/data'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Emotional Digital Twin"
        description="A living model of your mental wellness, updated from your check-ins and journals."
        action={
          <Button
            nativeButton={false}
            render={
              <Link href="/dashboard/check-in">
                <HeartPulse className="size-4" /> New check-in
              </Link>
            }
          />
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base">Emotional Health Score</CardTitle>
            <CardDescription>Composite of mood, energy and stress</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <ScoreGauge value={emotionalHealthScore} color="var(--chart-1)" label="Health" />
            <Badge variant="secondary" className="text-chart-3">Stable this week</Badge>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base">Burnout Risk</CardTitle>
            <CardDescription>Likelihood based on recent patterns</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <ScoreGauge value={burnoutRisk} color="var(--chart-5)" label="Risk" suffix="%" />
            <Badge variant="secondary" className="text-chart-4">
              <AlertTriangle className="size-3" /> Moderate
            </Badge>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base">Weekly Summary</CardTitle>
            <CardDescription className="flex items-center gap-1 text-chart-3">
              <TrendingUp className="size-3.5" /> Mood up {moodTrendDelta}% vs last week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{weeklySummary}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <TrendChart metric="mood" />
        <TrendChart metric="stress" />
        <TrendChart metric="energy" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: '/dashboard/journal', title: 'AI Journal', desc: 'Analyze your latest entry' },
          { href: '/dashboard/insights', title: 'Predictive Insights', desc: 'See your 7-day forecast' },
          { href: '/dashboard/future-self', title: 'Future Self', desc: 'Ask how you\u2019ll feel' },
          { href: '/dashboard/action-plan', title: 'Action Plan', desc: 'Your personalized steps' },
        ].map((c) => (
          <Link key={c.href} href={c.href}>
            <Card className="glass h-full transition-colors hover:bg-card/70">
              <CardContent className="flex items-start justify-between gap-2 pt-6">
                <div>
                  <div className="font-medium">{c.title}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">{c.desc}</div>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
