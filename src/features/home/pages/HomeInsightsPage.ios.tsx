import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { supportsLiquidGlass } from '../liquidGlass';

type BaseComponentType = typeof import('./HomeInsightsPage.tsx')['default'];
type ExtractProps<T> = T extends (props: infer P) => any ? P : Record<string, never>;
type HomeInsightsPageProps = ExtractProps<BaseComponentType>;

const BaseHomeInsightsPage = require('./HomeInsightsPage.tsx').default as BaseComponentType;

function HomeInsightsPage(props: HomeInsightsPageProps): ReactElement {
  if (!supportsLiquidGlass) {
    return <BaseHomeInsightsPage {...props} />;
  }

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={80} tint="light" style={styles.blur} />
      <View style={styles.content}>
        <BaseHomeInsightsPage {...props} />
      </View>
    </View>
  );
}

export { HomeInsightsPage };
export default HomeInsightsPage;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 32,
    overflow: 'hidden',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
  },
});
