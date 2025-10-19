/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/log/Tracking & Logging - Weight (7 Days).html'),
  'Weight Trend – 7 Days',
  {
    fallbackImage: require('../../assets/design/log/Tracking & Logging - Weight (7 Days).png'),
    description: 'Short term weight trend analytics.',
  },
);
