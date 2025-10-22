import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { supportsLiquidGlass } from '../liquidGlass';

type BaseComponentType = typeof import('./HomeTabsScreen.tsx')['default'];
type ExtractProps<T> = T extends (props: infer P) => any ? P : Record<string, never>;
type HomeTabsScreenProps = ExtractProps<BaseComponentType>;

const BaseHomeTabsScreen = require('./HomeTabsScreen.tsx').default as BaseComponentType;

function HomeTabsScreen(props: HomeTabsScreenProps): ReactElement {
  if (!supportsLiquidGlass) {
    return <BaseHomeTabsScreen {...props} />;
  }

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={85} tint="light" style={styles.blur} />
      <View style={styles.content}>
        <BaseHomeTabsScreen {...props} />
      </View>
    </View>
  );
}

export { HomeTabsScreen };
export default HomeTabsScreen;

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
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
  },
});
