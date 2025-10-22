import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { supportsLiquidGlass } from '../liquidGlass';

type BaseComponentType = typeof import('./HomeTopTabs.tsx')['default'];
type ExtractProps<T> = T extends (props: infer P) => any ? P : Record<string, never>;
type HomeTopTabsProps = ExtractProps<BaseComponentType>;

const BaseHomeTopTabs = require('./HomeTopTabs.tsx').default as BaseComponentType;

function HomeTopTabs(props: HomeTopTabsProps): ReactElement {
  if (!supportsLiquidGlass) {
    return <BaseHomeTopTabs {...props} />;
  }

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={80} tint="light" style={styles.blur} />
      <View style={styles.content}>
        <BaseHomeTopTabs {...props} />
      </View>
    </View>
  );
}

export { HomeTopTabs };
export default HomeTopTabs;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 12,
    borderRadius: 28,
    overflow: 'hidden',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
});
