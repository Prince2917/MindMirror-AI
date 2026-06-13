import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'
import { emotionColor, type EmotionScore } from '@/lib/data'

export function EmotionAnalysisCard({
  emotions,
  dominant,
  summary,
}: {
  emotions: EmotionScore[]
  dominant: EmotionScore['emotion']
  summary?: string
}) {
  const sorted = [...emotions].sort((a, b) => b.confidence - a.confidence)
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="size-4 text-primary" />
          AI Emotion Analysis
          <Badge variant="secondary" className="ml-auto font-normal">
            Dominant: {dominant}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {summary ? (
          <p className="rounded-xl bg-secondary/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            {summary}
          </p>
        ) : null}
        <div className="space-y-3">
          {sorted.map((e) => (
            <div key={e.emotion} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{e.emotion}</span>
                <span className="tabular-nums text-muted-foreground">{e.confidence}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${e.confidence}%`, backgroundColor: emotionColor(e.emotion) }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
