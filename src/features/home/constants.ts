import { palette, surfaces } from '../../styles/palette';

export const HOME_PRIMARY_COLOR = palette.brand.teal400;
export const HOME_BACKGROUND = surfaces.base;

export const HOME_TAB_KEYS = ['dashboard', 'actions', 'insights'] as const;

export type HomeTabKey = (typeof HOME_TAB_KEYS)[number];

export const HOME_TAB_LABELS: Record<HomeTabKey, string> = {
  dashboard: 'Today',
  actions: 'Quick Actions',
  insights: 'Insights',
};

export const HOME_CAROUSEL_DURATION_MS = 500;

