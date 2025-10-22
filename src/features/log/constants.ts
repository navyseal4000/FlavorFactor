export const LOG_PRIMARY_COLOR = '#a4ec13';
export const LOG_BACKGROUND = '#f7f8f5';

export const LOG_NAV_ROUTES = {
  food: '/log',
  weight: '/log/weight',
  activity: '/log/activity',
} as const;

export type LogTabKey = keyof typeof LOG_NAV_ROUTES;

