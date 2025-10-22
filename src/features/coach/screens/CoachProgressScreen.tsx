import { ReactElement, useCallback } from 'react';
import { useRouter } from 'expo-router';

import { CoachLayout } from '../components/CoachLayout';
import { CoachProgressPage } from '../pages/CoachProgressPage';
import { CoachTabKey } from '../constants';

/**
 * Expo Router screen for the progress tab within the coach feature.
 * Responsible for orchestrating navigation while delegating UI work to the
 * shared layout and feature page components.
 */
export function CoachProgressScreen(): ReactElement {
  const router = useRouter();

  const handleSelectTab = useCallback(
    (tab: CoachTabKey) => {
      if (tab === 'progress') return;
      router.replace('/coach/chat' as never);
    },
    [router],
  );

  return (
    <CoachLayout activeTab="progress" onSelectTab={handleSelectTab}>
      <CoachProgressPage />
    </CoachLayout>
  );
}
