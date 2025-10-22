import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { supportsLiquidGlass } from '../liquidGlass';

type BaseComponentType = typeof import('./HomeLayout.tsx')['default'];
type ExtractProps<T> = T extends (props: infer P) => any ? P : Record<string, never>;
type HomeLayoutProps = ExtractProps<BaseComponentType>;

const BaseHomeLayout = require('./HomeLayout.tsx').default as BaseComponentType;

function HomeLayout(props: HomeLayoutProps): ReactElement {
  if (!supportsLiquidGlass) {
    return <BaseHomeLayout {...props} />;
  }

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={90} tint="light" style={styles.blur} />
      <View style={styles.content}>
        <BaseHomeLayout {...props} />
      </View>
    </View>
  );
}

export { HomeLayout };
export default HomeLayout;

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
