/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/log/Log Meal Micronutrients.html'),
  'Log Meal – Micronutrients',
  {
    fallbackImage: require('../../assets/design/log/Log Meal Micronutrients.png'),
    description: 'Detailed nutrient breakdown for a tracked meal.',
  },
);
