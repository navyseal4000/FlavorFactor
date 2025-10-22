import { ReactElement } from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

type Variant = '7d' | '30d' | '365d';

const CHART_PATHS: Record<Variant, { fill: string; stroke: string }> = {
  '7d': {
    fill:
      'M0 109C39.3333 109 39.3333 21 78.6667 21C118 21 118 41 157.333 41C196.667 41 196.667 93 236 93C275.333 93 275.333 33 314.667 33C354 33 354 101 393.333 101C432.667 101 432.667 61 472 61V150H0V109Z',
    stroke:
      'M0 109C39.3333 109 39.3333 21 78.6667 21C118 21 118 41 157.333 41C196.667 41 196.667 93 236 93C275.333 93 275.333 33 314.667 33C354 33 354 101 393.333 101C432.667 101 432.667 61 472 61',
  },
  '30d': {
    fill:
      'M0 86C62.9333 86 62.9333 34 125.867 34C188.8 34 188.8 68 251.733 68C314.667 68 314.667 22 377.6 22C440.533 22 440.533 50 472 50V150H0V86Z',
    stroke:
      'M0 86C62.9333 86 62.9333 34 125.867 34C188.8 34 188.8 68 251.733 68C314.667 68 314.667 22 377.6 22C440.533 22 440.533 50 472 50',
  },
  '365d': {
    fill:
      'M0 135C19.6667 135 19.6667 110.833 39.3333 110.833C59 110.833 59 94.5833 78.6667 94.5833C98.3333 94.5833 98.3333 118.75 118 118.75C137.667 118.75 137.667 102.5 157.333 102.5C177 102.5 177 86.25 196.667 86.25C216.333 86.25 216.333 70 236 70C255.667 70 255.667 78.125 275.333 78.125C295 78.125 295 61.875 314.667 61.875C334.333 61.875 334.333 53.75 354 53.75C373.667 53.75 373.667 45.625 393.333 45.625C413 45.625 413 37.5 432.667 37.5C452.333 37.5 452.333 21.25 472 21.25V150H0V135Z',
    stroke:
      'M0 135C19.6667 135 19.6667 110.833 39.3333 110.833C59 110.833 59 94.5833 78.6667 94.5833C98.3333 94.5833 98.3333 118.75 118 118.75C137.667 118.75 137.667 102.5 157.333 102.5C177 102.5 177 86.25 196.667 86.25C216.333 86.25 216.333 70 236 70C255.667 70 255.667 78.125 275.333 78.125C295 78.125 295 61.875 314.667 61.875C334.333 61.875 334.333 53.75 354 53.75C373.667 53.75 373.667 45.625 393.333 45.625C413 45.625 413 37.5 432.667 37.5C452.333 37.5 452.333 21.25 472 21.25',
  },
};

export function WeightTrendChart({ variant }: { variant: Variant }): ReactElement {
  const { fill, stroke } = CHART_PATHS[variant];
  const gradientId = `weight-gradient-${variant}`;
  const showPoints = variant === '365d';
  const pointCoordinates =
    variant === '365d'
      ? [
          { cx: 39.3333, cy: 110.833 },
          { cx: 78.6667, cy: 94.5833 },
          { cx: 118, cy: 118.75 },
          { cx: 157.333, cy: 102.5 },
          { cx: 196.667, cy: 86.25 },
          { cx: 236, cy: 70 },
          { cx: 275.333, cy: 78.125 },
          { cx: 314.667, cy: 61.875 },
          { cx: 354, cy: 53.75 },
          { cx: 393.333, cy: 45.625 },
          { cx: 432.667, cy: 37.5 },
          { cx: 472, cy: 21.25 },
        ]
      : [];

  return (
    <Svg width="100%" height="100%" viewBox="0 0 472 150">
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#a4ec13" stopOpacity={0.3} />
          <Stop offset="1" stopColor="#a4ec13" stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path d={fill} fill={`url(#${gradientId})`} />
      <Path
        d={stroke}
        stroke="#a4ec13"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
      {showPoints &&
        pointCoordinates.map((point, index) => (
          <Circle
            key={`${point.cx}-${point.cy}-${index}`}
            cx={point.cx}
            cy={point.cy}
            r={4}
            fill="#a4ec13"
          />
        ))}
    </Svg>
  );
}
