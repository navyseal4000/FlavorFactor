import { ReactElement } from 'react';

import { PlanTabsScreen } from '../../src/features/plan/screens/PlanTabsScreen';

export default function PlanDailyRoute(): ReactElement {
  return <PlanTabsScreen initialTab="daily" />;
}
