import Link from 'next/link'
import {
  Brain,
  HeartPulse,
  NotebookPen,
  TrendingUp,
  Sparkles,
  ClipboardList,
  BarChart3,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  { icon: HeartPulse, title: 'Daily Mood Check-In', desc: 'Log mood, stress, energy, sleep and workload in seconds.' },
  { icon: NotebookPen, title: 'AI Journal', desc: 'Write freely and get instant emotion analysis with confidence scores.' },
  { icon: Brain, title: 'Emotional Digital Twin', desc: 'A living model of your emotional health, updated every day.' },
  { icon: TrendingUp, title: 'Predictive Insights', desc: 'Forecast your next 7 days and catch burnout before it hits.' },
  { icon: Sparkles, title: 'Future Self Simulator', desc: 'Ask how you\u2019ll feel next week and get a grounded prediction.' },
  { icon: ClipboardList, title: 'Personalized Action Plan', desc: 'AI recovery, wellness and productivity recommendations.' },
]

export default function LandingPage() {
  return (
    <div className="relative min-h-svh overflow-hidden">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-10">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/20 ring-1 ring-primary/30">
            <Brain className="size-5 text-primary" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            MindMirror<span className="text-primary"> AI</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" nativeButton={false} render={<Link href="/login">Sign in</Link>} />
          <Button nativeButton={false} render={<Link href="/signup">Get started</Link>} />
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-10 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Your emotional digital twin, powered by AI
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Understand how you feel.{' '}
            <span className="text-primary">Predict how you will.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            MindMirror AI turns your daily check-ins and journals into a living model of your
            mental wellness — forecasting burnout risk and building a personalized recovery plan.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={
                <Link href="/signup">
                  Start your check-in <ArrowRight className="size-4" />
                </Link>
              }
            />
            <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/dashboard">View live demo</Link>} />
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="rounded-2xl glass p-6 transition-colors hover:bg-card/60">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { stat: '68', label: 'Avg. emotional health score', icon: Brain },
            { stat: '7-day', label: 'Emotional forecast horizon', icon: TrendingUp },
            { stat: '5', label: 'Emotions detected per entry', icon: BarChart3 },
          ].map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="flex items-center gap-4 rounded-2xl glass p-6">
                <Icon className="size-7 text-primary" />
                <div>
                  <div className="text-2xl font-semibold">{s.stat}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-muted-foreground sm:px-6 lg:px-10">
        MindMirror AI — a mental wellness companion. Not a substitute for professional care.
      </footer>
    </div>
  )
}
