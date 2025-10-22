import { ReactElement } from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

export function ActivityTrendChart(): ReactElement {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 472 150">
      <Defs>
        <LinearGradient id="activity-gradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#a4ec13" stopOpacity={0.3} />
          <Stop offset="1" stopColor="#a4ec13" stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path
        d="M0 110C39.3333 110 39.3333 90 78.6667 90C118 90 118 60 157.333 60C196.667 60 196.667 105 236 105C275.333 105 275.333 70 314.667 70C354 70 354 45 393.333 45C432.667 45 432.667 85 472 85V150H0V110Z"
        fill="url(#activity-gradient)"
      />
      <Path
        d="M0 110C39.3333 110 39.3333 90 78.6667 90C118 90 118 60 157.333 60C196.667 60 196.667 105 236 105C275.333 105 275.333 70 314.667 70C354 70 354 45 393.333 45C432.667 45 432.667 85 472 85"
        stroke="#a4ec13"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

