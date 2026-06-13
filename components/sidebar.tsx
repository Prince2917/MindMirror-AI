'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  HeartPulse,
  NotebookPen,
  TrendingUp,
  Sparkles,
  ClipboardList,
  BarChart3,
  Brain,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/dashboard', label: 'Digital Twin', icon: LayoutDashboard },
  { href: '/dashboard/check-in', label: 'Daily Check-In', icon: HeartPulse },
  { href: '/dashboard/journal', label: 'AI Journal', icon: NotebookPen },
  { href: '/dashboard/insights', label: 'Predictive Insights', icon: TrendingUp },
  { href: '/dashboard/future-self', label: 'Future Self', icon: Sparkles },
  { href: '/dashboard/action-plan', label: 'Action Plan', icon: ClipboardList },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3 lg:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg glass p-2 text-foreground"
          aria-label="Toggle navigation"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl lg:static lg:flex',
          open ? 'flex' : 'hidden',
        )}
      >
        <div className="hidden px-6 py-6 lg:block">
          <Brand />
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {nav.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground',
                )}
              >
                <Icon className={cn('size-4.5', active && 'text-primary')} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 pb-6">
          <Link
            href="/dashboard/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl glass px-3 py-3 transition-colors hover:bg-sidebar-accent/50"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
              AR
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">Avery Rivera</span>
              <span className="block truncate text-xs text-muted-foreground">View profile</span>
            </span>
          </Link>
        </div>
      </aside>
    </>
  )
}

function Brand() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary/20 ring-1 ring-primary/30">
        <Brain className="size-5 text-primary" />
      </span>
      <span className="text-lg font-semibold tracking-tight text-foreground">
        MindMirror<span className="text-primary"> AI</span>
      </span>
    </Link>
  )
}
