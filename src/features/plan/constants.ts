import { palette, surfaces, withOpacity } from '../../styles/palette';

export const PLAN_PRIMARY_COLOR = palette.brand.lime500;
export const PLAN_BACKGROUND = surfaces.base;
export const PLAN_ACCENT_TINT = withOpacity(palette.brand.lime500, 0.16);
export const PLAN_ALERT_TINT = withOpacity(palette.semantic.danger, 0.16);

export const PLAN_NAV_ROUTES = {
  weekly: '/plan/plan-shop-dashboard-weekly',
  daily: '/plan/plan-shop-dashboard-daily',
  pantry: '/plan/pantry-view',
  cart: '/plan/plan-shop-cart-review',
} as const;

export type PlanTabKey = keyof typeof PLAN_NAV_ROUTES;

