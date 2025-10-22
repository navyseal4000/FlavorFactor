import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { supportsLiquidGlass } from '../liquidGlass';

type BaseComponentType = typeof import('./HomeNotificationsPage.tsx')['default'];
type ExtractProps<T> = T extends (props: infer P) => any ? P : Record<string, never>;
type HomeNotificationsPageProps = ExtractProps<BaseComponentType>;

const BaseHomeNotificationsPage = require('./HomeNotificationsPage.tsx').default as BaseComponentType;

function HomeNotificationsPage(props: HomeNotificationsPageProps): ReactElement {
  if (!supportsLiquidGlass) {
    return <BaseHomeNotificationsPage {...props} />;
  }

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={75} tint="light" style={styles.blur} />
      <View style={styles.content}>
        <BaseHomeNotificationsPage {...props} />
      </View>
    </View>
  );
}

export { HomeNotificationsPage };
export default HomeNotificationsPage;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 28,
    overflow: 'hidden',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
});
