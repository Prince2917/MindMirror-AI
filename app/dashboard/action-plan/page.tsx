'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Heart, Briefcase, BatteryCharging, Check, Sparkles } from 'lucide-react'
import { actionPlan } from '@/lib/data'
import { cn } from '@/lib/utils'

type Item = { title: string; detail: string; tag: string }

export default function ActionPlanPage() {
  const [done, setDone] = useState<Record<string, boolean>>({})
  const all = [...actionPlan.wellness, ...actionPlan.productivity, ...actionPlan.recovery]
  const completed = all.filter((i) => done[i.title]).length
  const pct = Math.round((completed / all.length) * 100)

  function toggle(title: string) {
    setDone((d) => ({ ...d, [title]: !d[title] }))
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Personalized Action Plan"
        description="AI-generated recommendations tailored to your patterns, triggers and recovery needs."
      />

      <Card className="glass">
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
              <Sparkles className="size-5" />
            </span>
            <div>
              <div className="font-medium">This week\u2019s plan</div>
              <div className="text-sm text-muted-foreground">{completed} of {all.length} actions completed</div>
            </div>
          </div>
          <div className="w-full sm:w-64">
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold tabular-nums">{pct}%</span>
            </div>
            <Progress value={pct} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="wellness">
        <TabsList>
          <TabsTrigger value="wellness">
            <Heart className="size-4" /> Wellness
          </TabsTrigger>
          <TabsTrigger value="productivity">
            <Briefcase className="size-4" /> Productivity
          </TabsTrigger>
          <TabsTrigger value="recovery">
            <BatteryCharging className="size-4" /> Recovery
          </TabsTrigger>
        </TabsList>

        <TabsContent value="wellness">
          <PlanGrid items={actionPlan.wellness} done={done} toggle={toggle} />
        </TabsContent>
        <TabsContent value="productivity">
          <PlanGrid items={actionPlan.productivity} done={done} toggle={toggle} />
        </TabsContent>
        <TabsContent value="recovery">
          <PlanGrid items={actionPlan.recovery} done={done} toggle={toggle} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PlanGrid({
  items,
  done,
  toggle,
}: {
  items: Item[]
  done: Record<string, boolean>
  toggle: (title: string) => void
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const isDone = done[item.title]
        return (
          <Card key={item.title} className={cn('glass transition-colors', isDone && 'opacity-70')}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-primary">{item.tag}</Badge>
                <Button
                  size="icon"
                  variant={isDone ? 'default' : 'outline'}
                  className="size-7"
                  onClick={() => toggle(item.title)}
                  aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
                >
                  <Check className="size-3.5" />
                </Button>
              </div>
              <CardTitle className={cn('text-base', isDone && 'line-through')}>{item.title}</CardTitle>
              <CardDescription className="leading-relaxed">{item.detail}</CardDescription>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  )
}
