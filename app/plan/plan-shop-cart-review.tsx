/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/plan/Plan & Shop - Cart Review.html'),
  'Plan & Shop – Cart Review',
  {
    fallbackImage: require('../../assets/design/plan/Plan & Shop - Cart Review.png'),
    description: 'Checkout review for groceries and pantry restocks.',
  },
);
