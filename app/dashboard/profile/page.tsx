'use client'

import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { emotionalHealthScore, journalEntries, moodHistory } from '@/lib/data'

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Your Profile"
        description="Manage your account and review your wellness journey at a glance."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
            <Avatar className="size-20">
              <AvatarFallback className="bg-primary/20 text-xl font-semibold text-primary">AR</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">Avery Rivera</h2>
              <p className="text-sm text-muted-foreground">avery@example.com</p>
            </div>
            <Badge variant="secondary">Premium member</Badge>
            <Separator />
            <div className="grid w-full grid-cols-3 gap-2 text-center">
              <Stat value={`${emotionalHealthScore}`} label="Health" />
              <Stat value={`${moodHistory.length}`} label="Check-ins" />
              <Stat value={`${journalEntries.length}`} label="Journals" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle>Account details</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault()
                toast.success('Profile updated')
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" defaultValue="Avery Rivera" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="avery@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Occupation</Label>
                  <Input id="role" defaultValue="Product Designer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal">Wellness goal</Label>
                  <Input id="goal" defaultValue="Reduce burnout risk" />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-secondary/50 py-3">
      <div className="text-lg font-semibold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}
