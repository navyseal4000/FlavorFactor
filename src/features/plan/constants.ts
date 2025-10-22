/**
 * Shared constants for the Plan feature, including navigation routes and
 * presentation colors. The structure mirrors the Log feature to keep the
 * experience consistent across tabs.
 */
export const PLAN_PRIMARY_COLOR = '#66d2ff';
export const PLAN_BACKGROUND = '#f7f8f5';

export const PLAN_NAV_ROUTES = {
  weekly: '/plan/plan-shop-dashboard-weekly',
  daily: '/plan/plan-shop-dashboard-daily',
  pantry: '/plan/pantry-view',
  cart: '/plan/plan-shop-cart-review',
} as const;

export type PlanTabKey = keyof typeof PLAN_NAV_ROUTES;
