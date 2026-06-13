'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Brain, Loader2, Send } from 'lucide-react'
import { forecast } from '@/lib/data'

type Message = { role: 'user' | 'ai'; content: string }

const suggestions = [
  'How will I likely feel next week?',
  'Will my burnout risk go up?',
  'When is my best day this week?',
  'What should I prepare for on Wednesday?',
]

function generatePrediction(question: string): string {
  const avg = forecast.reduce((a, b) => a + b.predicted, 0) / forecast.length
  const low = forecast.reduce((min, d) => (d.predicted < min.predicted ? d : min), forecast[0])
  const high = forecast.reduce((max, d) => (d.predicted > max.predicted ? d : max), forecast[0])
  const q = question.toLowerCase()

  if (q.includes('best') || q.includes('good')) {
    return `Based on your patterns, ${high.label} looks like your strongest day (projected mood ${high.predicted.toFixed(1)}/10). Energy and motivation should peak after a restful weekend — a great window for demanding or creative work.`
  }
  if (q.includes('burnout') || q.includes('risk')) {
    return `Your burnout risk is likely to climb mid-week as workload rises and sleep dips. The danger window is around ${low.label} (projected mood ${low.predicted.toFixed(1)}/10). If you protect sleep above 7 hours and batch your meetings, the model expects risk to stay moderate rather than high.`
  }
  if (q.includes('wednesday') || q.includes('prepare')) {
    return `Wednesday is your projected low point (${low.predicted.toFixed(1)}/10). Expect higher stress and reduced energy. Prepare by front-loading lighter tasks, scheduling a real break, and avoiding new commitments. A short walk and earlier wind-down the night before will soften the dip.`
  }
  return `Looking at your last two weeks, your projected average mood for the next 7 days is ${avg.toFixed(1)}/10. You'll likely start strong over the weekend, dip around ${low.label} as workload peaks, then recover toward ${high.label}. Overall: a stable week with one manageable mid-week trough. Protect your sleep and you'll likely stay in a healthy range.`
}

export default function FutureSelfPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content:
        'Hi Avery — I\u2019m your Future Self, modeled from your check-ins and journals. Ask me how you\u2019re likely to feel, and I\u2019ll project it from your historical patterns.',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  function ask(question: string) {
    if (!question.trim()) return
    setMessages((m) => [...m, { role: 'user', content: question }])
    setInput('')
    setLoading(true)
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'ai', content: generatePrediction(question) }])
      setLoading(false)
    }, 1200)
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Future Self Simulator"
        description="Ask your AI-modeled future self how you'll likely feel — grounded in your real data."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass flex h-[32rem] flex-col lg:col-span-2">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="size-4 text-primary" /> Conversation with your Future Self
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 space-y-4 overflow-y-auto py-5">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'flex justify-end' : 'flex gap-3'}>
                {msg.role === 'ai' ? (
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Brain className="size-4 text-primary" />
                  </span>
                ) : null}
                <div
                  className={
                    msg.role === 'user'
                      ? 'max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground'
                      : 'max-w-[80%] rounded-2xl rounded-tl-sm bg-secondary px-4 py-2.5 text-sm leading-relaxed'
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading ? (
              <div className="flex gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <Brain className="size-4 text-primary" />
                </span>
                <div className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-3">
                  <Loader2 className="size-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            ) : null}
          </CardContent>
          <div className="border-t border-border p-4">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                ask(input)
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="How will I likely feel next week?"
              />
              <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </Card>

        <Card className="glass h-fit">
          <CardHeader>
            <CardTitle className="text-base">Try asking</CardTitle>
            <CardDescription>Quick prompts to explore your forecast.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                disabled={loading}
                className="flex w-full items-center gap-2 rounded-xl bg-secondary/40 px-4 py-3 text-left text-sm transition-colors hover:bg-secondary disabled:opacity-50"
              >
                <Badge variant="secondary" className="shrink-0 px-1.5">
                  <Sparkles className="size-3 text-primary" />
                </Badge>
                {s}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
