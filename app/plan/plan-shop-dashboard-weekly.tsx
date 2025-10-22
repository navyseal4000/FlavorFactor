import { ReactElement } from 'react';

import { PlanTabsScreen } from '../../src/features/plan/screens/PlanTabsScreen';

export default function PlanWeeklyRoute(): ReactElement {
  return <PlanTabsScreen initialTab="weekly" />;
}
