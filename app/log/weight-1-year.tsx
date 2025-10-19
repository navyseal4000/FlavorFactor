/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/log/Tracking & Logging - Weight (1 Year).html'),
  'Weight Trend – 1 Year',
  {
    fallbackImage: require('../../assets/design/log/Tracking & Logging - Weight (1 Year).png'),
    description: 'Annualised weight history with progress markers.',
  },
);
