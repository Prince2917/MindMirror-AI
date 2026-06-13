export type MoodEntry = {
  date: string // ISO date
  label: string // e.g. "Mon"
  mood: number // 1-10
  stress: number // 1-10
  energy: number // 1-10
  sleep: number // hours
  workload: number // 1-10
}

export type EmotionScore = {
  emotion: 'Anxiety' | 'Stress' | 'Happiness' | 'Burnout' | 'Motivation'
  confidence: number // 0-100
}

export type JournalEntry = {
  id: string
  date: string
  preview: string
  emotions: EmotionScore[]
  dominant: EmotionScore['emotion']
}

// 14 days of trend data
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const moodHistory: MoodEntry[] = [
  { date: '2026-05-31', label: 'Sat', mood: 7, stress: 4, energy: 7, sleep: 7.5, workload: 4 },
  { date: '2026-06-01', label: 'Sun', mood: 8, stress: 3, energy: 8, sleep: 8, workload: 2 },
  { date: '2026-06-02', label: 'Mon', mood: 6, stress: 6, energy: 6, sleep: 6.5, workload: 7 },
  { date: '2026-06-03', label: 'Tue', mood: 5, stress: 7, energy: 5, sleep: 5.5, workload: 8 },
  { date: '2026-06-04', label: 'Wed', mood: 5, stress: 8, energy: 4, sleep: 5, workload: 9 },
  { date: '2026-06-05', label: 'Thu', mood: 4, stress: 8, energy: 4, sleep: 5.5, workload: 9 },
  { date: '2026-06-06', label: 'Fri', mood: 6, stress: 6, energy: 6, sleep: 7, workload: 6 },
  { date: '2026-06-07', label: 'Sat', mood: 7, stress: 4, energy: 7, sleep: 8, workload: 3 },
  { date: '2026-06-08', label: 'Sun', mood: 8, stress: 3, energy: 8, sleep: 8.5, workload: 2 },
  { date: '2026-06-09', label: 'Mon', mood: 6, stress: 6, energy: 6, sleep: 6, workload: 7 },
  { date: '2026-06-10', label: 'Tue', mood: 5, stress: 7, energy: 5, sleep: 6, workload: 8 },
  { date: '2026-06-11', label: 'Wed', mood: 6, stress: 6, energy: 6, sleep: 6.5, workload: 7 },
  { date: '2026-06-12', label: 'Thu', mood: 7, stress: 5, energy: 7, sleep: 7, workload: 5 },
  { date: '2026-06-13', label: 'Fri', mood: 7, stress: 5, energy: 7, sleep: 7.5, workload: 5 },
]

// Forecast next 7 days
export const forecast: { label: string; predicted: number; lower: number; upper: number }[] = [
  { label: 'Sat', predicted: 7.4, lower: 6.6, upper: 8.2 },
  { label: 'Sun', predicted: 7.8, lower: 7.0, upper: 8.6 },
  { label: 'Mon', predicted: 6.2, lower: 5.2, upper: 7.2 },
  { label: 'Tue', predicted: 5.6, lower: 4.4, upper: 6.8 },
  { label: 'Wed', predicted: 5.2, lower: 4.0, upper: 6.4 },
  { label: 'Thu', predicted: 5.8, lower: 4.6, upper: 7.0 },
  { label: 'Fri', predicted: 6.6, lower: 5.6, upper: 7.6 },
]

export const journalEntries: JournalEntry[] = [
  {
    id: 'j1',
    date: '2026-06-13',
    preview:
      'Wrapped up the quarterly review today. Felt a wave of relief but I am already thinking about next week\u2019s deadlines...',
    dominant: 'Motivation',
    emotions: [
      { emotion: 'Motivation', confidence: 72 },
      { emotion: 'Stress', confidence: 48 },
      { emotion: 'Happiness', confidence: 61 },
      { emotion: 'Anxiety', confidence: 33 },
      { emotion: 'Burnout', confidence: 21 },
    ],
  },
  {
    id: 'j2',
    date: '2026-06-11',
    preview:
      'Three back-to-back meetings drained me. I skipped lunch again and my focus completely collapsed by the afternoon...',
    dominant: 'Burnout',
    emotions: [
      { emotion: 'Burnout', confidence: 68 },
      { emotion: 'Stress', confidence: 74 },
      { emotion: 'Anxiety', confidence: 52 },
      { emotion: 'Motivation', confidence: 29 },
      { emotion: 'Happiness', confidence: 18 },
    ],
  },
  {
    id: 'j3',
    date: '2026-06-08',
    preview:
      'Slept in, went for a long walk by the river, and finally called my sister. A genuinely restorative Sunday.',
    dominant: 'Happiness',
    emotions: [
      { emotion: 'Happiness', confidence: 84 },
      { emotion: 'Motivation', confidence: 57 },
      { emotion: 'Anxiety', confidence: 12 },
      { emotion: 'Stress', confidence: 9 },
      { emotion: 'Burnout', confidence: 6 },
    ],
  },
]

export const emotionalHealthScore = 68 // 0-100
export const burnoutRisk = 42 // 0-100
export const moodTrendDelta = +8 // % vs last week

export const triggers = [
  { label: 'Back-to-back meetings', impact: 'high', detected: 6 },
  { label: 'Skipped meals', impact: 'medium', detected: 4 },
  { label: 'Sleep under 6 hours', impact: 'high', detected: 5 },
  { label: 'Late-night work', impact: 'medium', detected: 3 },
]

export const patterns = [
  'Your mood dips an average of 2.1 points on days with workload above 8/10.',
  'Stress peaks midweek (Wed\u2013Thu) and recovers over the weekend.',
  'Nights under 6 hours of sleep correlate with a 31% drop in next-day energy.',
  'Journaling days show 18% higher reported happiness than non-journaling days.',
]

export const actionPlan = {
  wellness: [
    { title: '10-minute morning breathwork', detail: 'Box breathing before your first meeting to lower baseline stress.', tag: 'Calm' },
    { title: 'Protect a real lunch break', detail: 'Block 30 minutes away from screens \u2014 your afternoon energy depends on it.', tag: 'Energy' },
    { title: 'Wind-down routine by 10:30pm', detail: 'Target 7+ hours of sleep to break the midweek crash cycle.', tag: 'Sleep' },
  ],
  productivity: [
    { title: 'Batch meetings into two windows', detail: 'Reduce context switching that drove this week\u2019s burnout signal.', tag: 'Focus' },
    { title: 'Set one daily priority', detail: 'Lower workload perception by committing to a single must-do.', tag: 'Clarity' },
  ],
  recovery: [
    { title: 'Schedule a no-work weekend', detail: 'Your recovery is strongest after 2 consecutive low-workload days.', tag: 'Reset' },
    { title: 'Reconnect socially', detail: 'Your happiest entries involve people \u2014 plan one social moment this week.', tag: 'Connection' },
  ],
}

export const weeklySummary =
  'This week started strong but dipped midweek as workload climbed above 8/10 and sleep dropped below 6 hours. Stress and early burnout signals peaked Wednesday through Thursday, then recovered as the weekend approached. Your emotional health score is holding steady at 68, with motivation rebounding by Friday. The main lever for next week is protecting sleep and breaking up meeting-heavy days.'

export function emotionColor(emotion: EmotionScore['emotion']): string {
  switch (emotion) {
    case 'Happiness':
      return 'var(--chart-3)'
    case 'Motivation':
      return 'var(--chart-1)'
    case 'Anxiety':
      return 'var(--chart-4)'
    case 'Stress':
      return 'var(--chart-2)'
    case 'Burnout':
      return 'var(--chart-5)'
  }
}

export { dayLabels }
