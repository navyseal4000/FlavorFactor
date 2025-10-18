/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/plan/Plan & Shop Dashboard - Weekly.html'),
  'Plan & Shop Dashboard – Weekly',
  {
    fallbackImage: require('../../assets/design/plan/Plan & Shop Dashboard - Weekly.png'),
    description: 'Weekly calendar of meals and shopping needs.',
  },
);
