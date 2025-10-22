import { ReactElement, useCallback } from 'react';
import { useRouter } from 'expo-router';

import { CoachLayout } from '../components/CoachLayout';
import { CoachChatPage } from '../pages/CoachChatPage';
import { CoachTabKey } from '../constants';

/**
 * Mirrors CoachProgressScreen but renders the conversational experience. Keeps
 * navigation glue isolated from presentational components for easier reuse.
 */
export function CoachChatScreen(): ReactElement {
  const router = useRouter();

  const handleSelectTab = useCallback(
    (tab: CoachTabKey) => {
      if (tab === 'chat') return;
      router.replace('/coach/progress' as never);
    },
    [router],
  );

  return (
    <CoachLayout activeTab="chat" onSelectTab={handleSelectTab}>
      <CoachChatPage />
    </CoachLayout>
  );
}
