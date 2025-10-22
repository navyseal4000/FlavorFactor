import { ReactElement } from 'react';

import { LogTabsScreen } from '../../src/features/log/screens/LogTabsScreen';

export default function WeightRoute(): ReactElement {
  return <LogTabsScreen initialTab="weight" />;
}
