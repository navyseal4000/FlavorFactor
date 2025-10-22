import { ReactElement } from 'react';

import { PlanTabsScreen } from '../../src/features/plan/screens/PlanTabsScreen';

export default function PlanCartRoute(): ReactElement {
  return <PlanTabsScreen initialTab="cart" />;
}
