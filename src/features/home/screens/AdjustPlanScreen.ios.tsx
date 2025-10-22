import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { supportsLiquidGlass } from '../liquidGlass';

type BaseComponentType = typeof import('./AdjustPlanScreen.tsx')['default'];
type ExtractProps<T> = T extends (props: infer P) => any ? P : Record<string, never>;
type AdjustPlanScreenProps = ExtractProps<BaseComponentType>;

const BaseAdjustPlanScreen = require('./AdjustPlanScreen.tsx').default as BaseComponentType;

function AdjustPlanScreen(props: AdjustPlanScreenProps): ReactElement {
  if (!supportsLiquidGlass) {
    return <BaseAdjustPlanScreen {...props} />;
  }

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={85} tint="light" style={styles.blur} />
      <View style={styles.content}>
        <BaseAdjustPlanScreen {...props} />
      </View>
    </View>
  );
}

export { AdjustPlanScreen };
export default AdjustPlanScreen;

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
    backgroundColor: 'rgba(255, 255, 255, 0.86)',
  },
});
