import { palette, surfaces } from '../../styles/palette';

export const LOG_PRIMARY_COLOR = palette.brand.lime500;
export const LOG_BACKGROUND = surfaces.base;

export const LOG_NAV_ROUTES = {
  food: '/log',
  weight: '/log/weight',
  activity: '/log/activity',
} as const;

export type LogTabKey = keyof typeof LOG_NAV_ROUTES;

