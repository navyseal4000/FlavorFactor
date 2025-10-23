export const palette = {
  brand: {
    lime500: '#a4ec13',
    lime600: '#83c90f',
    teal400: '#61c4e3',
    teal500: '#3da7cb',
  },
  neutral: {
    0: '#ffffff',
    25: '#fcfcfd',
    50: '#f8fafc',
    100: '#eef2f6',
    200: '#e2e8f0',
    300: '#cbd5f5',
    400: '#94a3b8',
    500: '#64748b',
    700: '#334155',
    900: '#0f172a',
  },
  semantic: {
    info: '#2563eb',
    success: '#16a34a',
    warning: '#f97316',
    danger: '#eb3456',
  },
  accent: {
    orange: '#f6662b',
    limeSoft: '#d9f99d',
    tealSoft: '#d5f0fb',
  },
} as const;

export const surfaces = {
  base: palette.neutral[50],
  card: palette.neutral[0],
  elevated: palette.neutral[0],
  overlay: 'rgba(15, 23, 42, 0.45)',
} as const;

export const textColors = {
  primary: palette.neutral[900],
  secondary: palette.neutral[500],
  muted: palette.neutral[400],
  inverse: palette.neutral[0],
} as const;

export const borderColors = {
  subtle: palette.neutral[200],
  strong: palette.neutral[300],
} as const;

export const segmentedControl = {
  track: palette.neutral[200],
  thumb: palette.neutral[0],
  shadow: withOpacity(palette.neutral[400], 0.25),
  activeText: palette.neutral[900],
  inactiveText: palette.neutral[500],
} as const;

export function withOpacity(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '');
  const expanded =
    normalized.length === 3
      ? normalized
          .split('')
          .map((value) => value + value)
          .join('')
      : normalized;

  const numeric = Number.parseInt(expanded, 16);
  const red = (numeric >> 16) & 255;
  const green = (numeric >> 8) & 255;
  const blue = numeric & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
