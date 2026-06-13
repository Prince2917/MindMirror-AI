'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Brain, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const isSignup = mode === 'signup'

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Mock auth flow
    setTimeout(() => {
      toast.success(isSignup ? 'Account created. Welcome to MindMirror.' : 'Welcome back.')
      router.push('/dashboard')
    }, 900)
  }

  return (
    <div className="flex min-h-svh items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/20 ring-1 ring-primary/30">
            <Brain className="size-5 text-primary" />
          </span>
          <span className="text-xl font-semibold tracking-tight">
            MindMirror<span className="text-primary"> AI</span>
          </span>
        </Link>

        <div className="rounded-3xl glass p-8 shadow-2xl">
          <div className="mb-6 space-y-1 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {isSignup ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignup
                ? 'Start building your emotional digital twin.'
                : 'Sign in to check in with your digital twin.'}
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {isSignup ? (
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Avery Rivera" required />
              </div>
            ) : null}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required defaultValue="avery@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required defaultValue="password" />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : isSignup ? 'Create account' : 'Sign in'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <Link
              href={isSignup ? '/login' : '/signup'}
              className="font-medium text-primary hover:underline"
            >
              {isSignup ? 'Sign in' : 'Sign up'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
