import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { supportsLiquidGlass } from '../liquidGlass';

type BaseComponentType = typeof import('./HomeDashboardPage.tsx')['default'];
type ExtractProps<T> = T extends (props: infer P) => any ? P : Record<string, never>;
type HomeDashboardPageProps = ExtractProps<BaseComponentType>;

const BaseHomeDashboardPage = require('./HomeDashboardPage.tsx').default as BaseComponentType;

function HomeDashboardPage(props: HomeDashboardPageProps): ReactElement {
  if (!supportsLiquidGlass) {
    return <BaseHomeDashboardPage {...props} />;
  }

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={80} tint="light" style={styles.blur} />
      <View style={styles.content}>
        <BaseHomeDashboardPage {...props} />
      </View>
    </View>
  );
}

export { HomeDashboardPage };
export default HomeDashboardPage;

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
