import type * as i from 'types';

import theme from './theme';

export type Theme = typeof theme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends i.Theme {}
}

export type BaseStyled = {
  theme?: i.Theme;
  className?: string;
};

export type ThemeColors = keyof typeof theme.colors;

export type SubThemeColors = {
  [color in i.ThemeColors]: Exclude<keyof (typeof theme.colors)[color], keyof string>;
};

export type ColorsFromTheme<Colors extends i.ThemeColors> = Colors;

export type SubcolorsFromColor<Color extends i.ThemeColors> = i.SubThemeColors[Color];

export type SubcolorFromTheme<
  Colors extends i.ThemeColors,
  Subcolors extends i.SubcolorsFromColor<Colors>,
> = [Colors, Subcolors];

