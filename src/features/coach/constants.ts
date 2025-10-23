import { surfaces } from '../../styles/palette';

export type CoachTabKey = 'progress' | 'chat';

export const COACH_NAV_ROUTES: Record<CoachTabKey, `/${string}`> = {
  progress: '/coach/progress',
  chat: '/coach/chat',
};

export const COACH_BACKGROUND = surfaces.base;
