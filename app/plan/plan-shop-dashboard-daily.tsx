/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/plan/Plan & Shop Dashboard - Daily.html'),
  'Plan & Shop Dashboard – Daily',
  {
    fallbackImage: require('../../assets/design/plan/Plan & Shop Dashboard - Daily.png'),
    description: 'Day level meal plan overview.',
  },
);
