import { ReactElement } from 'react';

import { LogTabsScreen } from '../../src/features/log/screens/LogTabsScreen';

export default function LogFoodRoute(): ReactElement {
  return <LogTabsScreen initialTab="food" />;
}
