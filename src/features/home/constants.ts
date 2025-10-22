export const HOME_PRIMARY_COLOR = '#61c4e3';
export const HOME_BACKGROUND = '#f7fafc';

export const HOME_TAB_KEYS = ['dashboard', 'actions', 'insights'] as const;

export type HomeTabKey = (typeof HOME_TAB_KEYS)[number];

export const HOME_TAB_LABELS: Record<HomeTabKey, string> = {
  dashboard: 'Today',
  actions: 'Quick Actions',
  insights: 'Insights',
};

export const HOME_CAROUSEL_DURATION_MS = 500;

