import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { supportsLiquidGlass } from '../liquidGlass';

type BaseComponentType = typeof import('./HomeQuickActionsPage.tsx')['default'];
type ExtractProps<T> = T extends (props: infer P) => any ? P : Record<string, never>;
type HomeQuickActionsPageProps = ExtractProps<BaseComponentType>;

const BaseHomeQuickActionsPage = require('./HomeQuickActionsPage.tsx').default as BaseComponentType;

function HomeQuickActionsPage(props: HomeQuickActionsPageProps): ReactElement {
  if (!supportsLiquidGlass) {
    return <BaseHomeQuickActionsPage {...props} />;
  }

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={75} tint="light" style={styles.blur} />
      <View style={styles.content}>
        <BaseHomeQuickActionsPage {...props} />
      </View>
    </View>
  );
}

export { HomeQuickActionsPage };
export default HomeQuickActionsPage;

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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
