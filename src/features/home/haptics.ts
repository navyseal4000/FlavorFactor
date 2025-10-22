import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

function withIosOnly(callback: () => void) {
  if (Platform.OS !== 'ios') return;
  callback();
}

export function triggerHomeImpact(
  style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Medium,
): void {
  withIosOnly(() => {
    void Haptics.impactAsync(style).catch(() => {});
  });
}

export function triggerHomeSelection(): void {
  withIosOnly(() => {
    void Haptics.selectionAsync().catch(() => {});
  });
}

export function triggerHomeNotification(): void {
  withIosOnly(() => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  });
}
