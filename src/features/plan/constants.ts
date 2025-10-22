import theme from '../../styles/theme';

/**
 * Shared constants for the Plan feature, including navigation routes and
 * presentation colors. The structure mirrors the Log feature to keep the
 * experience consistent across tabs.
 */
export const PLAN_PRIMARY_COLOR = theme.colors.primary;
export const PLAN_BACKGROUND = toAlphaColor(theme.colors.primaryLight, 0.28);
export const PLAN_ACCENT_TINT = toAlphaColor(theme.colors.primary, 0.16);
export const PLAN_ALERT_TINT = toAlphaColor(theme.colors.red, 0.16);

/**
 * Converts a hex color into an rgba string with an alpha channel.
 *
 * We keep this helper colocated with the plan constants so that future
 * adjustments to the feature palette remain deterministic and theme-aware
 * without pulling in an additional dependency.
 */
export function toAlphaColor(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '');
  const expanded =
    normalized.length === 3
      ? normalized
          .split('')
          .map((value) => value + value)
          .join('')
      : normalized;

  const numeric = parseInt(expanded, 16);
  const red = (numeric >> 16) & 255;
  const green = (numeric >> 8) & 255;
  const blue = numeric & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export const PLAN_NAV_ROUTES = {
  weekly: '/plan/plan-shop-dashboard-weekly',
  daily: '/plan/plan-shop-dashboard-daily',
  pantry: '/plan/pantry-view',
  cart: '/plan/plan-shop-cart-review',
} as const;

export type PlanTabKey = keyof typeof PLAN_NAV_ROUTES;
