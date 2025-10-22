/**
 * Mock data tailored for the coach feature. The structures model the two major
 * surfaces we support today: aggregated progress insights and conversational
 * coaching threads.
 */
export interface CoachHighlight {
  id: string;
  label: string;
  value: string;
  trendDirection: 'up' | 'down';
  trendLabel: string;
  description: string;
}

export interface CoachFocusArea {
  id: string;
  title: string;
  completionPercent: number;
  summary: string;
  owner: string;
}

export interface CoachMemberSummary {
  id: string;
  name: string;
  goal: string;
  adherencePercent: number;
  lastCheckIn: string;
  status: 'on-track' | 'at-risk';
  messagePreview: string;
}

export interface CoachActionItem {
  id: string;
  title: string;
  scheduledFor: string;
  description: string;
}

export interface CoachMessage {
  id: string;
  sender: 'coach' | 'member';
  author: string;
  timestamp: string;
  body: string;
}

export interface CoachConversationMeta {
  memberName: string;
  goalSummary: string;
  cadence: string;
  nextCheckIn: string;
}

export const coachHighlights: CoachHighlight[] = [
  {
    id: 'weight-loss',
    label: 'Avg weight delta',
    value: '-1.8 lbs',
    trendDirection: 'down',
    trendLabel: 'vs last 30 days',
    description: 'Clients following the plan are trending toward healthy loss.',
  },
  {
    id: 'meal-adherence',
    label: 'Meal adherence',
    value: '86%',
    trendDirection: 'up',
    trendLabel: '4% WoW improvement',
    description: 'Most members completed their planned meals over the weekend.',
  },
  {
    id: 'habit-completion',
    label: 'Habit completion',
    value: '5.2 / 7',
    trendDirection: 'up',
    trendLabel: '1 more than last week',
    description: 'Daily movement streaks and hydration logs are improving.',
  },
];

export const coachFocusAreas: CoachFocusArea[] = [
  {
    id: 'hydration',
    title: 'Hydration reminders',
    completionPercent: 72,
    summary: 'Follow up with members missing hydration logs for 3+ days.',
    owner: 'Coach Jordan',
  },
  {
    id: 'weekend-plan',
    title: 'Weekend planning',
    completionPercent: 54,
    summary: 'Share quick recipes for members requesting low-effort options.',
    owner: 'Coach Priya',
  },
  {
    id: 'movement',
    title: 'Movement streaks',
    completionPercent: 91,
    summary: 'Celebrate consistent activity with personalised encouragements.',
    owner: 'Coach Malik',
  },
];

export const coachMembers: CoachMemberSummary[] = [
  {
    id: 'maggie',
    name: 'Maggie F.',
    goal: 'Lose 12 lbs by summer',
    adherencePercent: 92,
    lastCheckIn: 'Yesterday · Video call',
    status: 'on-track',
    messagePreview: 'Loved the overnight oats recipe—requesting more like it!',
  },
  {
    id: 'alex',
    name: 'Alex T.',
    goal: 'Improve energy for marathon training',
    adherencePercent: 64,
    lastCheckIn: '2 days ago · Message',
    status: 'at-risk',
    messagePreview: 'Struggling to hit protein targets after long runs.',
  },
  {
    id: 'naomi',
    name: 'Naomi W.',
    goal: 'Stabilise blood sugar swings',
    adherencePercent: 78,
    lastCheckIn: 'Today · Photo log',
    status: 'on-track',
    messagePreview: 'Shared new grocery finds that fit the carb targets.',
  },
];

export const coachActionItems: CoachActionItem[] = [
  {
    id: 'check-in',
    title: 'Prep Friday check-in deck',
    scheduledFor: 'Due tomorrow',
    description: 'Compile progress charts for Naomi and share celebratory notes.',
  },
  {
    id: 'recipe-pack',
    title: 'Send Alex recovery recipes',
    scheduledFor: 'Due in 2 days',
    description: 'Bundle simple post-run meals that deliver 30g+ protein.',
  },
];

export const coachConversationMeta: CoachConversationMeta = {
  memberName: 'Maggie Fields',
  goalSummary: 'Healthy weight loss with 4x weekly strength sessions',
  cadence: 'Weekly check-ins · Mondays',
  nextCheckIn: 'Friday, 9:00 AM',
};

export const coachConversation: CoachMessage[] = [
  {
    id: '1',
    sender: 'member',
    author: 'Maggie',
    timestamp: 'Today · 8:12 AM',
    body: 'Morning! Sharing weigh-in results—down 1.2 lbs this week. Energy has been steady.',
  },
  {
    id: '2',
    sender: 'coach',
    author: 'You',
    timestamp: 'Today · 8:20 AM',
    body: 'Amazing work, Maggie! I noticed hydration dipped on Wednesday. Think we can set a reminder?',
  },
  {
    id: '3',
    sender: 'member',
    author: 'Maggie',
    timestamp: 'Today · 8:24 AM',
    body: 'Yes please—midday Slack reminders help a ton. Also curious about swapping Friday dinner.',
  },
  {
    id: '4',
    sender: 'coach',
    author: 'You',
    timestamp: 'Today · 8:32 AM',
    body: 'I have a high-protein stir fry that fits your macros. Sending it now and adding the hydration nudge.',
  },
];
