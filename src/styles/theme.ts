import { borderColors, palette, surfaces, textColors, withOpacity } from './palette';

const theme = {
  palette,
  colors: {
    primary: palette.brand.lime500,
    primaryHover: palette.brand.lime600,
    primaryLight: withOpacity(palette.brand.teal400, 0.3),
    brandSecondary: palette.brand.teal400,
    textPrimary: textColors.primary,
    textSecondary: textColors.secondary,
    textMuted: textColors.muted,
    textInverse: textColors.inverse,
    black: palette.neutral[900],
    gray: palette.neutral[400],
    gray800: palette.neutral[500],
    white: palette.neutral[0],
    orange: palette.accent.orange,
    red: palette.semantic.danger,
    borderSubtle: borderColors.subtle,
    borderStrong: borderColors.strong,
    surfaceBase: surfaces.base,
    surfaceCard: surfaces.card,
  },
  ui: {
    borderRadius: {
      card: '32px',
      badge: '12px',
      button: '16px',
      buttonSmall: '8px',
    },
    shadows: '0px 6px 6px -6px rgba(0, 0, 0, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.4)',
  },
} as const;

export type AppTheme = typeof theme;
export default theme;

