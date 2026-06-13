'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { EmotionAnalysisCard } from '@/components/emotion-analysis-card'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Loader2, Sparkles } from 'lucide-react'
import { journalEntries, type EmotionScore } from '@/lib/data'
import { cn } from '@/lib/utils'

type Analysis = {
  emotions: EmotionScore[]
  dominant: EmotionScore['emotion']
  summary: string
}

// Lightweight keyword-driven mock "AI" analysis
function analyze(text: string): Analysis {
  const t = text.toLowerCase()
  const score = (words: string[], base: number) =>
    Math.min(95, base + words.reduce((acc, w) => acc + (t.includes(w) ? 18 : 0), 0))

  const emotions: EmotionScore[] = [
    { emotion: 'Anxiety', confidence: score(['worried', 'anxious', 'nervous', 'overthink', 'fear'], 22) },
    { emotion: 'Stress', confidence: score(['stress', 'deadline', 'pressure', 'overwhelmed', 'busy'], 28) },
    { emotion: 'Happiness', confidence: score(['happy', 'grateful', 'joy', 'relaxed', 'fun', 'great'], 24) },
    { emotion: 'Burnout', confidence: score(['exhausted', 'drained', 'tired', 'burnt', 'nothing left'], 18) },
    { emotion: 'Motivation', confidence: score(['excited', 'goal', 'focus', 'ready', 'progress', 'motivated'], 30) },
  ]
  const dominant = [...emotions].sort((a, b) => b.confidence - a.confidence)[0].emotion
  return {
    emotions,
    dominant,
    summary: `Your entry reads as primarily ${dominant.toLowerCase()}. The model weighs tone, word choice and intensity across five emotional dimensions to surface what's underneath the words.`,
  }
}

export default function JournalPage() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Analysis | null>(null)

  function submit() {
    if (!text.trim()) return
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult(analyze(text))
      setLoading(false)
    }, 1100)
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="AI Journal"
        description="Write freely about your day. MindMirror analyzes the emotional fingerprint of your words."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>New entry</CardTitle>
              <CardDescription>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Today I felt..."
                className="min-h-52 resize-none text-base leading-relaxed"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{text.trim().split(/\s+/).filter(Boolean).length} words</span>
                <Button onClick={submit} disabled={loading || !text.trim()}>
                  {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                  {loading ? 'Analyzing' : 'Submit & analyze'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {result ? (
            <EmotionAnalysisCard emotions={result.emotions} dominant={result.dominant} summary={result.summary} />
          ) : (
            <Card className="glass border-dashed">
              <CardContent className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
                <Sparkles className="size-7 text-primary/60" />
                <p className="text-sm">Your emotion analysis will appear here after you submit an entry.</p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="glass h-fit">
          <CardHeader>
            <CardTitle>Recent entries</CardTitle>
            <CardDescription>Your last few journals and their dominant emotion.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {journalEntries.map((entry) => (
              <div key={entry.id} className="rounded-xl bg-secondary/40 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                  <Badge
                    variant="secondary"
                    className={cn(
                      'font-normal',
                      entry.dominant === 'Happiness' && 'text-chart-3',
                      entry.dominant === 'Burnout' && 'text-chart-5',
                      entry.dominant === 'Motivation' && 'text-chart-1',
                    )}
                  >
                    {entry.dominant}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{entry.preview}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
