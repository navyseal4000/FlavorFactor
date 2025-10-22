import { ReactElement } from 'react';

import { PlanTabsScreen } from '../../src/features/plan/screens/PlanTabsScreen';

export default function PlanPantryRoute(): ReactElement {
  return <PlanTabsScreen initialTab="pantry" />;
}
