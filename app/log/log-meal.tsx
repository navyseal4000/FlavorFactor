/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/log/Log Meal.html'),
  'Log Meal',
  {
    fallbackImage: require('../../assets/design/log/Log Meal.png'),
    description: 'Quick meal logging workflow.',
  },
);
