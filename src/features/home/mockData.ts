import { MaterialIconsGlyphs } from './types';

export interface HomeHighlight {
  id: string;
  label: string;
  value: string;
  deltaLabel: string;
  deltaDirection: 'up' | 'down' | 'neutral';
  icon: MaterialIconsGlyphs;
  iconTint: string;
  iconBackground: string;
}

export interface MacroBreakdown {
  id: string;
  label: string;
  grams: number;
  target: number;
  color: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: MaterialIconsGlyphs;
  description: string;
  href: string;
}

export interface CoachPrompt {
  id: string;
  title: string;
  summary: string;
  timestamp: string;
  actionLabel: string;
  actionHref: string;
}

export interface UpcomingEvent {
  id: string;
  timeLabel: string;
  title: string;
  icon: MaterialIconsGlyphs;
  accentColor: string;
  details: string;
}

export interface InsightTrend {
  id: string;
  title: string;
  value: string;
  trendLabel: string;
  trendDirection: 'up' | 'down' | 'neutral';
  description: string;
}

export interface RoutineRecommendation {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  icon: MaterialIconsGlyphs;
  accentColor: string;
}

export interface HabitFocus {
  id: string;
  label: string;
  streakLabel: string;
  icon: MaterialIconsGlyphs;
  accentColor: string;
  helperText: string;
}

export interface PlanFocusOption {
  id: string;
  title: string;
  description: string;
  isPrimary?: boolean;
}

export interface ScheduleWindow {
  id: string;
  label: string;
  duration: string;
  icon: MaterialIconsGlyphs;
}

export interface HomeUserProfile {
  name: string;
}

export interface HomeNotification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  read?: boolean;
}

export const homeUser: HomeUserProfile = {
  name: 'Jordan',
};

export const homeNotifications: HomeNotification[] = [
  {
    id: 'coach-reminder',
    title: 'Coach Riley',
    body: 'Shared a new check-in summary for this week. Review before tomorrow’s session.',
    timestamp: '2h ago',
  },
  {
    id: 'plan-update',
    title: 'Plan Updated',
    body: 'Macro targets adjusted based on your recent activity trend.',
    timestamp: 'Yesterday',
  },
  {
    id: 'streak',
    title: 'Streak Alert',
    body: 'Protein streak is at 9 days—keep it going!',
    timestamp: '2 days ago',
    read: true,
  },
];

export const homeHighlights: HomeHighlight[] = [
  {
    id: 'calories',
    label: 'Calories Remaining',
    value: '540 kcal',
    deltaLabel: '180 kcal ahead of schedule',
    deltaDirection: 'up',
    icon: 'local-fire-department',
    iconTint: '#f97316',
    iconBackground: '#ffedd5',
  },
  {
    id: 'protein',
    label: 'Protein',
    value: '82 g',
    deltaLabel: '14 g to go',
    deltaDirection: 'down',
    icon: 'egg',
    iconTint: '#0ea5e9',
    iconBackground: '#dbeafe',
  },
  {
    id: 'hydration',
    label: 'Hydration',
    value: '68 oz',
    deltaLabel: 'Goal reached',
    deltaDirection: 'neutral',
    icon: 'water-drop',
    iconTint: '#2563eb',
    iconBackground: '#dbeafe',
  },
];

export const macroBreakdown: MacroBreakdown[] = [
  { id: 'carbs', label: 'Carbs', grams: 145, target: 220, color: '#60a5fa' },
  { id: 'protein', label: 'Protein', grams: 82, target: 96, color: '#facc15' },
  { id: 'fat', label: 'Fat', grams: 46, target: 65, color: '#fb7185' },
];

export const quickActions: QuickAction[] = [
  {
    id: 'add-meal',
    label: 'Log a Meal',
    icon: 'restaurant',
    description: 'Capture breakfast, lunch, or dinner details.',
    href: '/log/add-food',
  },
  {
    id: 'scan-barcode',
    label: 'Scan Barcode',
    icon: 'qr-code',
    description: 'Use the barcode scanner for packaged items.',
    href: '/log/barcode',
  },
  {
    id: 'start-workout',
    label: 'Start Workout',
    icon: 'directions-run',
    description: 'Track an upcoming training session.',
    href: '/log/activity',
  },
  {
    id: 'adjust-plan',
    label: 'Adjust Plan',
    icon: 'playlist-add-check',
    description: 'Update macro targets and nutrition focus.',
    href: '/home/adjust-plan',
  },
];

export const coachPrompts: CoachPrompt[] = [
  {
    id: 'coach-protein',
    title: 'Coach Notes',
    summary: 'Great job closing your calorie gap early—shift focus to protein with one high-protein snack.',
    timestamp: 'Today • 2:15 PM',
    actionLabel: 'View recommended snacks',
    actionHref: '/coach/progress',
  },
  {
    id: 'coach-recovery',
    title: 'Recovery Tip',
    summary: 'Schedule active recovery tomorrow to support this week’s training load.',
    timestamp: 'Yesterday • 6:05 PM',
    actionLabel: 'Open recovery ideas',
    actionHref: '/plan/recovery',
  },
];

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 'meal-prep',
    timeLabel: '4:30 PM',
    title: 'Meal Prep Reminder',
    icon: 'kitchen',
    accentColor: '#22c55e',
    details: 'Pre-build three lunches with 35 g protein each.',
  },
  {
    id: 'coaching',
    timeLabel: 'Tomorrow',
    title: 'Check-in with Coach Riley',
    icon: 'support-agent',
    accentColor: '#6366f1',
    details: 'Share latest weight log and appetite notes.',
  },
];

export const insightTrends: InsightTrend[] = [
  {
    id: 'weight-trend',
    title: 'Weight Trend',
    value: '−1.8 lbs',
    trendLabel: 'vs last 7 days',
    trendDirection: 'down',
    description: 'Consistent progress maintained for three consecutive weeks.',
  },
  {
    id: 'sleep-quality',
    title: 'Sleep Quality',
    value: '7.6 hrs',
    trendLabel: 'up 12%',
    trendDirection: 'up',
    description: 'Improved bedtime routine tracking with wearable sync.',
  },
  {
    id: 'calorie-adherence',
    title: 'Calorie Adherence',
    value: '92%',
    trendLabel: 'past 14 days',
    trendDirection: 'up',
    description: 'High adherence correlates with lean mass retention.',
  },
];

export const routineRecommendations: RoutineRecommendation[] = [
  {
    id: 'meal-prep',
    title: 'Sunday Meal Prep',
    description: 'Batch roast veggies and portion lean protein for three lunches.',
    durationMinutes: 40,
    icon: 'set-meal',
    accentColor: '#facc15',
  },
  {
    id: 'mobility',
    title: 'Morning Mobility',
    description: '7 pose flow to open hips and thoracic spine before work.',
    durationMinutes: 12,
    icon: 'self-improvement',
    accentColor: '#38bdf8',
  },
  {
    id: 'hydrate',
    title: 'Hydration Break',
    description: 'Stand, stretch, and drink 12 oz of water.',
    durationMinutes: 5,
    icon: 'local-drink',
    accentColor: '#a855f7',
  },
];

export const habitFocuses: HabitFocus[] = [
  {
    id: 'fiber',
    label: 'Fiber Goal',
    streakLabel: '5 day streak',
    icon: 'spa',
    accentColor: '#34d399',
    helperText: 'Add leafy greens to dinner to lock-in streak.',
  },
  {
    id: 'bedtime',
    label: 'Lights Out by 10:30',
    streakLabel: '3 day streak',
    icon: 'hotel',
    accentColor: '#60a5fa',
    helperText: 'Wind-down reminder scheduled for 9:45 PM.',
  },
  {
    id: 'reflection',
    label: 'Evening Reflection',
    streakLabel: 'New habit',
    icon: 'edit-note',
    accentColor: '#f97316',
    helperText: 'Capture one win and one focus area nightly.',
  },
];

export const planFocusOptions: PlanFocusOption[] = [
  {
    id: 'fatloss',
    title: 'Fat loss',
    description: 'Moderate calorie deficit with high satiety focus.',
    isPrimary: true,
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'Fuel endurance work with increased carbohydrates.',
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    description: 'Hold steady while dialing in recovery habits.',
  },
];

export const scheduleWindows: ScheduleWindow[] = [
  {
    id: 'weekday',
    label: 'Weekday Evenings',
    duration: '6:00 PM – 9:00 PM',
    icon: 'dark-mode',
  },
  {
    id: 'weekend',
    label: 'Weekend Prep',
    duration: '11:00 AM – 1:00 PM',
    icon: 'brunch-dining',
  },
  {
    id: 'travel',
    label: 'Travel Buffer',
    duration: 'Use quick-cook templates',
    icon: 'flight-takeoff',
  },
];

