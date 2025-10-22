import { ReactElement } from 'react';

import { LogTabsScreen } from '../../src/features/log/screens/LogTabsScreen';

export default function ActivityRoute(): ReactElement {
  return <LogTabsScreen initialTab="activity" />;
}
