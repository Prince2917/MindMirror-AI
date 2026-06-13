'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Smile, Flame, Zap, Moon, Briefcase, Check } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const sliderConfig = [
  { key: 'mood', label: 'Mood', icon: Smile, low: 'Low', high: 'Great', color: 'text-chart-3' },
  { key: 'stress', label: 'Stress', icon: Flame, low: 'Calm', high: 'Overwhelmed', color: 'text-chart-5' },
  { key: 'energy', label: 'Energy', icon: Zap, low: 'Drained', high: 'Energized', color: 'text-chart-1' },
] as const

export default function CheckInPage() {
  const [values, setValues] = useState({ mood: 6, stress: 5, energy: 6 })
  const [sleep, setSleep] = useState(7)
  const [workload, setWorkload] = useState(6)
  const [saved, setSaved] = useState(false)

  function save() {
    setSaved(true)
    toast.success('Check-in saved. Your digital twin has been updated.')
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Daily Check-In"
        description="Take a moment to log how you're doing today. This feeds your emotional digital twin."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle>How are you feeling?</CardTitle>
            <CardDescription>Slide to rate each dimension from 1 to 10.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {sliderConfig.map((s) => {
              const Icon = s.icon
              const value = values[s.key]
              return (
                <div key={s.key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <Icon className={cn('size-4', s.color)} />
                      {s.label}
                    </span>
                    <span className="text-sm font-semibold tabular-nums text-primary">{value}/10</span>
                  </div>
                  <Slider
                    value={[value]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={([v]) => setValues((prev) => ({ ...prev, [s.key]: v }))}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{s.low}</span>
                    <span>{s.high}</span>
                  </div>
                </div>
              )
            })}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sleep" className="flex items-center gap-2">
                  <Moon className="size-4 text-chart-2" /> Sleep last night (hours)
                </Label>
                <Input
                  id="sleep"
                  type="number"
                  min={0}
                  max={14}
                  step={0.5}
                  value={sleep}
                  onChange={(e) => setSleep(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workload" className="flex items-center gap-2">
                  <Briefcase className="size-4 text-chart-4" /> Workload level (1-10)
                </Label>
                <Input
                  id="workload"
                  type="number"
                  min={1}
                  max={10}
                  step={1}
                  value={workload}
                  onChange={(e) => setWorkload(Number(e.target.value))}
                />
              </div>
            </div>

            <Button onClick={save} className="w-full" size="lg">
              {saved ? <><Check className="size-4" /> Saved</> : 'Save today\u2019s check-in'}
            </Button>
          </CardContent>
        </Card>

        <Card className="glass h-fit lg:col-span-1">
          <CardHeader>
            <CardTitle>Today\u2019s snapshot</CardTitle>
            <CardDescription>A live preview as you adjust.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Mood', value: `${values.mood}/10` },
              { label: 'Stress', value: `${values.stress}/10` },
              { label: 'Energy', value: `${values.energy}/10` },
              { label: 'Sleep', value: `${sleep} hrs` },
              { label: 'Workload', value: `${workload}/10` },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between rounded-xl bg-secondary/40 px-4 py-3">
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="text-sm font-semibold">{row.value}</span>
              </div>
            ))}
            <p className="rounded-xl bg-primary/10 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
              Tip: Consistent daily check-ins make your 7-day forecast significantly more accurate.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
